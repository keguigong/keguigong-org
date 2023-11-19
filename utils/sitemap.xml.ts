import fs from 'fs'
import path from 'path'
import { getLastedUpdatedPostDate, getSortedPostsIndex } from './file-operations'
import { getLastModifiedDate } from './git-info'

const EXTERNAL_DATA_URL = 'https://keguigong.org'
const SITEMAP_PATH = path.join(process.cwd(), 'public/sitemap.xml')
const workPagePath = path.join(process.cwd(), 'pages', 'work.tsx')
const photoPagePath = path.join(process.cwd(), 'pages', 'photo.tsx')

function generateSiteMap(posts: any[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${EXTERNAL_DATA_URL}</loc>\
    ${getLastedUpdatedPostDate() ? `\n    <lastmod>${getLastedUpdatedPostDate()}</lastmod>` : ''}
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${EXTERNAL_DATA_URL}/work</loc>
    <lastmod>${getLastModifiedDate(workPagePath)}</lastmod>
  </url>
  <url>
    <loc>${EXTERNAL_DATA_URL}/photo</loc>
    <lastmod>${getLastModifiedDate(photoPagePath)}</lastmod>
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
