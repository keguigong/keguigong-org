import fs from "fs"
import path from "path"
import matter from "gray-matter"

const articlesDir = path.join(process.cwd(), "pages/articles")

export function getSortedArticlesData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(articlesDir)
  const allArticlesData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.mdx$/, "")

    // Read markdown file as string
    const fullPath = path.join(articlesDir, fileName)
    const fileContents = fs.readFileSync(fullPath, "utf8")

    // Use gray-matter to parse the post metadata section
    const frontMatter = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      type: "mdx",
      ...frontMatter.data
    }
  })

  // Sort posts by date
  return allArticlesData.sort((a: { [key: string]: any }, b: { [key: string]: any }) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}
