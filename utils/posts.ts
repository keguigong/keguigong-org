import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeStringify from 'rehype-stringify'
import rehypeRaw from 'rehype-raw'
// import rehypeSanitize from 'rehype-sanitize'
import yaml from 'js-yaml'

import readingTime from 'reading-time'
import { getLastModifiedDate } from './git-info'

export const POSTS_DIR = path.join(process.cwd(), 'posts')

function getEligibleFileNames(dir: string) {
  return fs.readdirSync(dir).filter((filename) => {
    const extname = path.extname(filename).toLowerCase()
    return ['.md'].indexOf(extname) > -1
  })
}

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = getEligibleFileNames(POSTS_DIR)

  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/^\d{4}-\d{1,2}-\d{1,2}-/, '').replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(POSTS_DIR, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf-8')

    // Use gray-matter to parse the post metadata section
    const frontMatter = matter(fileContents)
    const timeToRead = readingTime(fileContents)
    const excerpt = md2html(frontMatter.data.excerpt)

    // Combine the data with the id
    return {
      id,
      timeToRead,
      ...frontMatter.data,
      excerpt
    }
  })

  // Sort posts by date
  return allPostsData.sort((a: { [key: string]: any }, b: { [key: string]: any }) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getAllPostIds() {
  const fileNames = getEligibleFileNames(POSTS_DIR)
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/^\d{4}-\d{1,2}-\d{1,2}-/, '').replace(/\.md$/, '')
      }
    }
  })
}

export async function getPostData(id: string) {
  const filename = getEligibleFileNames(POSTS_DIR).find((filename) => filename.indexOf(id) > -1)

  if (!filename) return

  const fullPath = path.join(POSTS_DIR, filename)
  const fileContents = fs.readFileSync(fullPath, 'utf-8')
  const lastModifiedDate = getLastModifiedDate(fullPath)

  // Use gray-matter to parse the post metadata section
  const frontMatter = matter(fileContents)

  // Use remark to convert markdown into HTML string
  const processContent = await unified()
    .use(remarkParse) // Parse markdown.
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true }) // Turn it into HTML.
    .use(rehypePrettyCode, { theme: 'github-dark' })
    .use(rehypeRaw)
    // .use(rehypeSanitize)
    .use(rehypeStringify) // Turn it into HTML.
    .process(frontMatter.content)

  const contentHtml = processContent.toString()

  // Parse authors.yaml
  const yamlPath = path.join(POSTS_DIR, 'authors.yml')
  const yamlContents = fs.readFileSync(yamlPath, 'utf-8')
  const authors: any = yaml.load(yamlContents)
  const author = authors[frontMatter.data.author] || null

  // Combine the data with the id
  return {
    id,
    lastModifiedDate,
    contentHtml,
    ...frontMatter.data,
    author
  }
}

export function md2html(md: string) {
  const processContent = unified().use(remarkParse).use(remarkRehype).use(rehypeStringify).processSync(md)
  const contentHtml = processContent.toString()
  return contentHtml
}
