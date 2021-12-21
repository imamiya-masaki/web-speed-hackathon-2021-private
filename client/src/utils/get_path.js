/**
 * @param {string} imageId
 * @returns {string}
 */
function getImagePath(imageId) {
  if (document.body.offsetWidth <= 361) {
    return `/images/${imageId}@178x318.webp`
    return 
  }
  return `/images/${imageId}.webp`
}

/**
 * @param {string} movieId
 * @returns {string}
 */
function getMoviePath(movieId) {
  if (document.body.offsetWidth <= 401) {
    return `/movies/${movieId}@358.gif`
  }
  return `/movies/${movieId}.gif`;
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
function getProfileImagePath(profileImageId) {
  return `/images/profiles/${profileImageId}.webp`;
}

export { getImagePath, getMoviePath, getSoundPath, getProfileImagePath };
