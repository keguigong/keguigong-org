const fs = require("fs")
const path = require("path")

/**
 * Remove all API routes to output static files
 * @link Understanding "API Routes in Static Export" Warning in Next.js https://nextjs.org/docs/messages/api-routes-static-export
 */
function rmAPIRoutes() {
  const APIRoutes = ["app/ogimage"]
  const ROOT_DIR = process.cwd()

  APIRoutes.forEach((filename) => {
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

module.exports = rmAPIRoutes
