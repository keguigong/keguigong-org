import fs from 'fs'
import path from 'path'
import { getSortedPostsIndex } from './file-operations'

const EXTERNAL_DATA_URL = 'https://keguigong.org'
const SITEMAP_PATH = path.join(process.cwd(), 'public/sitemap.xml')

function generateSiteMap(posts: any[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${EXTERNAL_DATA_URL}</loc>
  </url>
  <url>
    <loc>${EXTERNAL_DATA_URL}/works</loc>
  </url>
  <url>
    <loc>${EXTERNAL_DATA_URL}/photos</loc>
  </url>${posts
    .map(({ id, lastModifiedDate }) => {
      return `
  <url>
    <loc>${`${EXTERNAL_DATA_URL}/post/${id}`}</loc>
    <lastmod>${lastModifiedDate}</lastmod>
  </url>`
    })
    .join('\r')}
</urlset>
`
}

const postsData = getSortedPostsIndex()
const siteMapTxt = generateSiteMap(postsData)
fs.writeFileSync(SITEMAP_PATH, siteMapTxt, { encoding: 'utf-8' })
