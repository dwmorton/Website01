const PDFDocument = require('pdfkit');
const https = require('https');
const http = require('http');

function downloadImage(url, maxRedirects = 5) {
  return new Promise((resolve, reject) => {
    if (maxRedirects === 0) {
      return reject(new Error('Too many redirects'));
    }

    const protocol = url.startsWith('https') ? https : http;
    protocol
      .get(url, { headers: { 'User-Agent': 'fantasy-scottish-league/1.0', 'Accept': 'image/jpeg,image/png,image/*' } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          const redirectUrl = res.headers.location.startsWith('http')
            ? res.headers.location
            : new URL(res.headers.location, url).toString();
          return downloadImage(redirectUrl, maxRedirects - 1).then(resolve).catch(reject);
        }

        if (res.statusCode !== 200) {
          return reject(new Error(`Failed to download image: ${res.statusCode}`));
        }

        const chunks = [];
        res.on('data', (chunk) => chunks.push(chunk));
        res.on('end', () => {
          const buffer = Buffer.concat(chunks);
          if (buffer.length === 0) {
            return reject(new Error('Empty image buffer'));
          }
          resolve(buffer);
        });
      })
      .on('error', reject);
  });
}

async function downloadPlayerImages(players) {
  const imageMap = new Map();
  await Promise.all(
    players.map(async (player) => {
      if (player.photoUrl && player.photoUrl.startsWith('http')) {
        try {
          let imageUrl = player.photoUrl;
          const urlObj = new URL(imageUrl);
          urlObj.searchParams.set('format', 'jpg');
          urlObj.searchParams.set('mode', 'max');
          urlObj.searchParams.set('width', '400');
          imageUrl = urlObj.toString();
          
          const imageBuffer = await downloadImage(imageUrl);
          if (imageBuffer && imageBuffer.length > 0) {
            imageMap.set(player.id, imageBuffer);
          } else {
            console.warn(`Empty image buffer for ${player.name}`);
          }
        } catch (err) {
          console.warn(`Failed to download image for ${player.name}:`, err.message);
        }
      }
    })
  );
  return imageMap;
}

function renderPlayerCard(doc, player, x, y, cardWidth, cardHeight, imageMap) {
  doc.roundedRect(x, y, cardWidth, cardHeight, 5).stroke('#cccccc').lineWidth(1);

  const imageSize = 60;
  const imageX = x + 10;
  const imageY = y + 10;

  const imageBuffer = imageMap.get(player.id);
  if (imageBuffer && imageBuffer.length > 0) {
    try {
      doc.image(imageBuffer, imageX, imageY, {
        width: imageSize,
        height: imageSize,
        fit: [imageSize, imageSize],
        align: 'left'
      });
    } catch (err) {
      console.error(`Error rendering image for ${player.name}:`, err.message);
      doc.rect(imageX, imageY, imageSize, imageSize)
        .fill('#e0e0e0')
        .fillColor('#666666')
        .fontSize(8)
        .text('Error', imageX + 5, imageY + imageSize / 2 - 5);
    }
  } else {
    doc.rect(imageX, imageY, imageSize, imageSize)
      .fill('#e0e0e0')
      .fillColor('#666666')
      .fontSize(8)
      .text('No Photo', imageX + 5, imageY + imageSize / 2 - 5);
  }

  const textX = imageX + imageSize + 10;
  const textWidth = cardWidth - imageSize - 30;

  doc.fillColor('#000000').fontSize(12).font('Helvetica-Bold');
  doc.text(player.name, textX, y + 10, { width: textWidth, ellipsis: true });

  doc.fontSize(9).font('Helvetica');
  doc.fillColor('#666666');
  doc.text(`${player.position} · ${player.club}`, textX, y + 28, { width: textWidth, ellipsis: true });

  doc.fillColor('#1a4d2e').fontSize(10).font('Helvetica-Bold');
  doc.text(`£${player.value.toFixed(1)}m`, textX, y + 45, { width: textWidth });

  doc.fillColor('#000000').fontSize(8);
  const statsY = y + 60;
  doc.text(`Caps: ${player.stats.caps}`, textX, statsY);
  if (player.stats.goals > 0) {
    doc.text(`Goals: ${player.stats.goals}`, textX, statsY + 12);
  }
  if (player.stats.assists > 0) {
    doc.text(`Assists: ${player.stats.assists}`, textX, statsY + 24);
  }
}

function buildTeamPdf({ user, team, players }) {
  return new Promise(async (resolve, reject) => {
    try {
      const imageMap = await downloadPlayerImages(players);

      const doc = new PDFDocument({ size: 'A4', margin: 40 });
      const buffers = [];
      doc.on('data', (chunk) => buffers.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.on('error', reject);

      const pageWidth = doc.page.width;
      const pageHeight = doc.page.height;
      const margin = 40;

      doc.rect(0, 0, pageWidth, 80).fill('#1a4d2e');
      doc.fillColor('#ffffff').fontSize(24).font('Helvetica-Bold');
      doc.text('Fantasy Scottish Football League', margin, 30, { align: 'left' });
      doc.fontSize(12).font('Helvetica');
      doc.text(`Team: ${team.team_name}`, margin, 55, { align: 'left' });

      let yPos = 100;

      doc.fillColor('#000000').fontSize(11);
      doc.text(`Manager: ${user.name}`, margin, yPos);
      doc.text(`Email: ${user.email}`, margin, yPos + 15);
      doc.text(`Squad Value: £${team.total_value.toFixed(1)}m`, margin, yPos + 30);

      yPos = 180;

      doc.fontSize(16).font('Helvetica-Bold').fillColor('#1a4d2e');
      doc.text('Starting XI', margin, yPos);
      doc.moveDown(1.5);

      yPos = 220;
      const cardWidth = (pageWidth - margin * 2 - 20) / 2;
      const cardHeight = 140;
      const cardMargin = 10;

      const positions = { GK: [], DF: [], MF: [], FW: [] };
      players.forEach((p) => {
        if (positions[p.position]) {
          positions[p.position].push(p);
        }
      });

      let row = 0;
      let col = 0;
      let currentYPos = yPos;

      for (const [pos, posPlayers] of Object.entries(positions)) {
        for (const player of posPlayers) {
          const x = margin + col * (cardWidth + cardMargin);
          const y = currentYPos + row * (cardHeight + cardMargin);

          if (y + cardHeight > pageHeight - 40) {
            doc.addPage();
            currentYPos = 40;
            row = 0;
            col = 0;
            const newX = margin + col * (cardWidth + cardMargin);
            const newY = currentYPos + row * (cardHeight + cardMargin);
            renderPlayerCard(doc, player, newX, newY, cardWidth, cardHeight, imageMap);
            col++;
            if (col >= 2) {
              col = 0;
              row++;
            }
            continue;
          }

          renderPlayerCard(doc, player, x, y, cardWidth, cardHeight, imageMap);

          col++;
          if (col >= 2) {
            col = 0;
            row++;
          }
        }
      }

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = { buildTeamPdf };
