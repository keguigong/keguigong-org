'use strict';
import fs from 'fs'
import path from 'path'
import { getLastModifiedDate } from './git-info'

export const POSTS_DIR = path.join(process.cwd(), 'posts')

/** Get post files with .md extension */
export function getEligibleFiles(dir: string) {
  return fs.readdirSync(dir).filter((filename) => {
    const extname = path.extname(filename).toLowerCase()
    return ['.md'].indexOf(extname) > -1
  })
}

/** Remove file extension and date from file name to get id */
export function fileName2Id(fileName: string) {
  return fileName.replace(/^\d{4}-\d{1,2}-\d{1,2}-/, '').replace(/\.md$/, '')
}

/** Get sorted posts index for sitemap */
export function getSortedPostsIndex() {
  const fileNames = getEligibleFiles(POSTS_DIR)
  const allPostsIndex = fileNames.map((fileName) => {
    const id = fileName2Id(fileName)
    const fullPath = path.join(POSTS_DIR, fileName)
    const lastModifiedDate = getLastModifiedDate(fullPath)

    return {
      id,
      lastModifiedDate
    }
  })

  return allPostsIndex.sort((a: any, b: any) => {
    if (a.lastModifiedDate < b.lastModifiedDate) {
      return 1
    } else {
      return -1
    }
  })
}
