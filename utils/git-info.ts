import { execSync } from "child_process"

export const getLastModifiedDate = (fullPath: string): string => {
  const date = execSync(`git log -n 1 --date=short --pretty=format:%cd ${fullPath}`, {
    encoding: "utf-8",
  })
  return date
}
