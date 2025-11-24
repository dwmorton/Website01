const nodemailer = require('nodemailer');

async function getTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE } = process.env;

  if (SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS) {
    return {
      transporter: nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT),
        secure: SMTP_SECURE === 'true',
        auth: { user: SMTP_USER, pass: SMTP_PASS }
      })
    };
  }

  const testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass
    }
  });

  return { transporter, previewAccount: testAccount };
}

async function sendTeamEmail({ recipient, pdfBuffer, teamName }) {
  const { transporter, previewAccount } = await getTransporter();

  const info = await transporter.sendMail({
    from: process.env.MAIL_FROM || 'fantasy-league@example.com',
    to: recipient,
    subject: `Your Fantasy Team: ${teamName}`,
    text: `Attached is the printable PDF of your fantasy team "${teamName}".`,
    attachments: [
      {
        filename: `${teamName.replace(/\s+/g, '_')}.pdf`,
        content: pdfBuffer,
        contentType: 'application/pdf'
      }
    ]
  });

  let previewUrl = null;
  if (previewAccount) {
    previewUrl = nodemailer.getTestMessageUrl(info);
  }

  return { info, previewUrl };
}

module.exports = { sendTeamEmail };

