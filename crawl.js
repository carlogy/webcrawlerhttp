function normalizeURL(urlString) {
  const parsedURL = new URL(urlString);

  const normalizedURL = `${parsedURL.hostname}${parsedURL.pathname}`;
  if (normalizedURL.slice(-1) === "/") {
    return normalizedURL.slice(0, normalizedURL.length - 1);
  } else {
    return normalizedURL;
  }
}

module.exports = {
  normalizeURL,
};
