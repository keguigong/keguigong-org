import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"
import prism from "remark-prism"
import readingTime from "reading-time"

import { getLastModifiedDate } from "./git-info"

export const postsDirectory = path.join(process.cwd(), "posts")

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "")

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, "utf8")

    // Use gray-matter to parse the post metadata section
    const frontMatter = matter(fileContents)
    const timeToRead = readingTime(fileContents)

    // Combine the data with the id
    return {
      id,
      timeToRead,
      ...frontMatter.data
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
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, "")
      }
    }
  })
}

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, "utf-8")
  const lastModifiedDate = getLastModifiedDate(fullPath)

  // Use gray-matter to parse the post metadata section
  const frontMatter = matter(fileContents)

  // Use remark to convert markdown into HTML string
  const processContent = await remark()
    // https://github.com/sergioramos/remark-prism/issues/265
    .use(html, { sanitize: false })
    .use(prism, { plugins: ["line-numbers"] })
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
