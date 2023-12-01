const path = require("path")

console.log("__dirname: ", __dirname)

/** @type {import("puppeteer").Configuration} */
module.exports = {
  // Changes the cache location for Puppeteer.
  cacheDirectory: path.join(__dirname, ".cache", "puppeteer")
}
