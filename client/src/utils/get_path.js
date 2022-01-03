/**
 * @param {string} imageId
 * @returns {string}
 */
function getImagePath(imageId, type=0) {
  // type = 0 最大横
  // type = 1 縦
  // type = mini横
  const mobile = document.body.offsetWidth <= 361 ? '@mobile' : ''
  const imageFile = type === 0 ? 'widthImage' :  type === 1 ? 'heightImage' : 'widthMiniImage'
  return `/images/${imageFile}-${imageId}${mobile}.avif`
}

/**
 * @param {string} movieId
 * @returns {string}
 */
function getWebmPath(movieId) {
  if (document.body.offsetWidth <= 401) {
    return `/movies/${movieId}@358.webm`
  }
  return `/movies/${movieId}.webm`;
}

/**
 * @param {string} soundId
 * @returns {string}
 */
function getSoundPath(soundId) {
  return `/sounds/${soundId}.mp3`;
}

/**
 * @param {string} profileImageId
 * @returns {string}
 */
function getProfileImagePath(profileImageId, mini=true, abWindows=false) {
  return `/images/profiles/${mini ? 'mini' : 'normal'}-${profileImageId}${document.body.offsetWidth <= 361 && !abWindows ? '@mobile': ''}.avif`;
}

export { getImagePath, getSoundPath, getProfileImagePath, getWebmPath };
