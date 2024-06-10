const { normalizeURL, getURLsFromHTML } = require("./crawl.js");
const { test, expect } = require("@jest/globals");

test("normalizeURL strip protocol", () => {
  const input = "https://blog.boot.dev/path";
  const actual = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("normalizeURL trailing slashes", () => {
  const input = "https://blog.boot.dev/path/";
  const actual = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("normalizeURL not secure", () => {
  const input = "http://blog.boot.dev/path";
  const actual = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("normalizeURL not secure and trailing /", () => {
  const input = "http://blog.boot.dev/path/";
  const actual = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("normalizeURL capitals", () => {
  const input = "https://BLOG.boot.dev/path";
  const actual = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("gethtmlString", () => {
  const input =
    '<html><body><a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a></body></html>';
  const actual = getURLsFromHTML(input);
  const expected =
    '<html><body><a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a></body></html>';
  expect(actual).toEqual(expected);
});

test("gethtmlString relativeURL", () => {
  const htmlString =
    '<html><body><a href="/path"><span>Go to Boot.dev</span></a></body></html>';
  const baseURL = "https://blog.boot.dev";
  const actual = getURLsFromHTML(htmlString, baseURL);
  const expected = ["https://blog.boot.dev/path"];
  expect(actual).toEqual(expected);
});
