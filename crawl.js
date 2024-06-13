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

async function crawlPage(currentURL) {
  try {
    const response = await fetch(currentURL, {
      method: "GET",
    });

    const status = await response.status;
    const contentType = await response.headers.get("Content-Type");
    const body = await response.text();

    if (status >= 400) {
      console.log(`Received status code 500 or greater ${status}`);
      return `Received status code 500 or greater ${status}`;
    }

    if (!contentType.includes(contentType)) {
      console.log(`Received incompatible content-type ${contentType}`);
      return "Received incompatible content-type";
    }
    console.log(body);
    return body;
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage,
};
