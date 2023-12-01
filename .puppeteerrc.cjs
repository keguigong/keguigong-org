const path = require("path")

const cacheDiretory =
  process.env.NODE_ENV === "production"
    ? path.join(__dirname, ".next/server", ".cache", "puppeteer")
    : path.join(__dirname, ".cache", "puppeteer")

console.log("=====.puppeteerrc======\n", cacheDiretory)

/** @type {import("puppeteer").Configuration} */
module.exports = {
  // Changes the cache location for Puppeteer.
  cacheDirectory: cacheDiretory
}
