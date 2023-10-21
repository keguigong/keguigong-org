import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkGfm from "remark-gfm"
import remarkRehype from "remark-rehype"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeStringify from "rehype-stringify"

import readingTime from "reading-time"
import { getLastModifiedDate } from "./git-info"

export const POSTS_DIR = path.join(process.cwd(), "posts")

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(POSTS_DIR)
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "")

    // Read markdown file as string
    const fullPath = path.join(POSTS_DIR, fileName)
    const fileContents = fs.readFileSync(fullPath, "utf8")

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
  const fileNames = fs.readdirSync(POSTS_DIR)
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, "")
      }
    }
  })
}

const PRETTY_CODE_OPTIONS = {
  // keepBackground: false,
  theme: "github-dark",
  grid: false
}

export async function getPostData(id: string) {
  const fullPath = path.join(POSTS_DIR, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, "utf-8")
  const lastModifiedDate = getLastModifiedDate(fullPath)

  // Use gray-matter to parse the post metadata section
  const frontMatter = matter(fileContents)

  // Use remark to convert markdown into HTML string
  const processContent = await unified()
    .use(remarkParse) // Parse markdown.
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true }) // Turn it into HTML.
    .use(rehypePrettyCode, PRETTY_CODE_OPTIONS)
    .use(rehypeStringify) // Turn it into HTML.
    .process(frontMatter.content)

  const contentHtml = processContent.toString()

  // Combine the data with the id
  return {
    id,
    lastModifiedDate,
    contentHtml,
    ...frontMatter.data
  }
}

export function md2html(md: string) {
  // Use remark to convert markdown into HTML string
  const processContent = unified().use(remarkParse).use(remarkRehype).use(rehypeStringify).processSync(md)
  const contentHtml = processContent.toString()
  return contentHtml
}

export function mdfile2html(path: string) {
  const md = fs.readFileSync(path, { encoding: "utf-8" })
  // Use remark to convert markdown into HTML string
  const processContent = unified().use(remarkParse).use(remarkRehype).use(rehypeStringify).processSync(md)
  const contentHtml = processContent.toString()
  return contentHtml
}
