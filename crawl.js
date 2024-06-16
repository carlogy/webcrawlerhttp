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
        console.log(`error with absolute url: ${error.message}`);
      }
    } else if (!address.href.includes(baseURL) && address.href[0] === "/") {
      try {
        const urlObject = new URL(`${baseURL}${address.href.slice(1)}`);
        addressArray.push(urlObject.href);
      } catch (error) {
        console.log(`error with relative url: ${error.message}`);
      }
    } else {
      try {
        const urlObject = new URL(address.href);
        addressArray.push(urlObject.href);
      } catch (error) {
        console.log(`error with non-domain url: ${error.message}`);
      }
    }
  }
  return addressArray;
}

async function crawlPage(baseURL, currentURL = baseURL, pages = {}) {
  if (!currentURL.includes(baseURL)) {
    return pages;
  }

  const normalizedURL = normalizeURL(currentURL);

  if (pages.hasOwnProperty(normalizedURL)) {
    pages[normalizedURL] += 1;
    return pages;
  } else {
    pages[normalizedURL] = 1;
  }

  const currentHTML = await fetchAndParseHTML(currentURL);
  const currentURLList = getURLsFromHTML(currentHTML, currentURL);

  for (item of currentURLList) {
    crawlPage(baseURL, item, pages);
  }

  return pages;
}

async function fetchAndParseHTML(currentURL) {
  try {
    const response = await fetch(currentURL, {
      method: "GET",
    });

    const status = await response.status;
    const contentType = await response.headers.get("Content-Type");
    const body = await response.text();

    if (status >= 400) {
      console.log(
        `Error in fetch with status code: ${status}, on page: ${currentURL}`,
      );
      return;
    }

    if (!contentType.includes("text/html")) {
      console.log(
        `None html response, content-type: ${contentType}, on page: ${currentURL}`,
      );
      return;
    }

    return body;
  } catch (error) {
    console.log(`Error in fetch: ${error.message}, on page: ${currentURL}`);
    return;
  }
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage,
};
