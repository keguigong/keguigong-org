const fs = require("fs")
const path = require("path")

const PRODUCTION = process.env.NODE_ENV === "production"
/**
 * Static Exports
 * @link https://nextjs.org/docs/pages/building-your-application/deploying/static-exports
 */
const STATIC_EXPORTS = ["true", true].indexOf(process.env.STATIC_EXPORTS) > -1
/**
 * An indicator that the code is running in a Continuous Integration environment.
 */
const CI = ["true", "1", true, 1].indexOf(process.env.CI) > -1
/**
 * An indicator to show that System Environment Variables have been exposed to your project's Deployments
 * @link System Environment Variables https://vercel.com/docs/projects/environment-variables/system-environment-variables#system-environment-variables
 */
const VERCEL = process.env.VERCEL
/**
 * The name of the action currently running, or the id of a step.
 * @link Default environment variables https://docs.github.com/en/actions/learn-github-actions/variables#default-environment-variables
 */
const GITHUB_ACTION = process.env.GITHUB_ACTION
const ROOT_DIR = path.join(__dirname, "app")
const API_ROUTES = ["api/ogimage"]
const PAGES = ["page.tsx", "work", "photo", "post"]

function rm(paths) {
  paths.forEach((filename) => {
    let fullPath = path.join(ROOT_DIR, filename)
    if (fs.existsSync(fullPath)) {
      let stats = fs.statSync(fullPath)
      if (stats.isDirectory()) {
        fs.rmdirSync(fullPath, { recursive: true, force: true })
      } else {
        fs.rmSync(fullPath)
      }
    }
  })
}

/**
 * Customize nextConfig
 * @param {import('next').NextConfig} nextConfig
 */
function customizeNextConfig(nextConfig) {
  if (CI) console.log("RUNNING IN CI ENVIRONMENT")
  if (GITHUB_ACTION) console.log("RUNNING IN GITHUB ACTION")
  if (VERCEL) console.log("RUNNING IN VERCEL")

  if (CI) {
    if (STATIC_EXPORTS) {
      nextConfig.output = "export"
      rm(API_ROUTES)
      return nextConfig
    }

    if (VERCEL && !STATIC_EXPORTS) {
      rm(PAGES)
      return nextConfig
    }
  }
  return nextConfig
}

module.exports = customizeNextConfig
