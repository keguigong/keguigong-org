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
import { POSTS_DIR, getEligibleFiles, fileName2Id } from './file-operations'

/** Get sorted posts data for blog list */
export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = getEligibleFiles(POSTS_DIR)
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName2Id(fileName)

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
  return allPostsData.sort((a: any, b: any) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

/** Get all post ids to generate static paths for dynamic routes */
export function getAllPostIds() {
  const fileNames = getEligibleFiles(POSTS_DIR)
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName2Id(fileName)
      }
    }
  })
}

/** Get one post body data */
export async function getPostData(id: string) {
  const filename = getEligibleFiles(POSTS_DIR).find((filename) => filename.indexOf(id) > -1)
  if (!filename) return {}

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

/** Convert markdown to html */
export function md2html(md: string) {
  const processContent = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeStringify)
    .processSync(md)
  const contentHtml = processContent.toString()
  return contentHtml
}
