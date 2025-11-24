const PLACEHOLDER_PATH = '/img/player-placeholder.svg';

async function hydratePlayerPhotos(playerList) {
  for (const player of playerList) {
    if (!player.photoUrl || !player.photoUrl.startsWith('http')) {
      player.photoUrl = PLACEHOLDER_PATH;
    }
  }
}

module.exports = { hydratePlayerPhotos, PLACEHOLDER_PATH };

