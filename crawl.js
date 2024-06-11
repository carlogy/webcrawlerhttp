const { JSDOM } = require("jsdom");

function normalizeURL(urlString) {
  const parsedURL = new URL(urlString);

  const normalizedURL = `${parsedURL.hostname}${parsedURL.pathname}`;
  if (normalizedURL.slice(-1) === "/") {
    return normalizedURL.slice(0, normalizedURL.length - 1);
  } else {
    return normalizedURL;
  }
}

function getURLsFromHTML(htmlString, baseURL) {
  if (baseURL === undefined) {
    throw new TypeError("baseURL parameter is undefined");
  }

  const dom = new JSDOM(htmlString);
  const anchorArray = dom.window.document.querySelectorAll("a");
  const addressArray = [];

  for (let address of anchorArray) {
    if (address.href.includes(baseURL)) {
      try {
        const urlObject = new URL(address.href);
        addressArray.push(urlObject.href);
      } catch (error) {
        console.log(`error with relative url: ${error.message}`);
      }
    } else {
      try {
        const urlObject = new URL(`${baseURL}${address.href}`);
        addressArray.push(urlObject.href);
      } catch (error) {
        console.log(`error with relative url: ${error.message}`);
      }
    }
  }
  return addressArray;
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
};
