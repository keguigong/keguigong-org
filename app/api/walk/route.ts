import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

type Node = {
  name: string
  type: "directory" | "file"
  children?: Node[]
}

function walkSync(cwd: string, filename: string, tree: Node) {
  const fullPath = path.join(cwd, filename)
  const stat = fs.statSync(fullPath)
  if (stat.isDirectory()) {
    const fileNames = fs.readdirSync(fullPath)
    const node: Node = {
      name: filename,
      type: "directory",
      children: []
    }
    tree.children?.push(node)
    for (const filename of fileNames) {
      walkSync(fullPath, filename, node)
    }
  } else {
    const node: Node = {
      name: filename,
      type: "file"
    }
    tree.children?.push(node)
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  const tree: Node = {
    name: "root",
    type: "directory",
    children: []
  }
  walkSync(process.cwd(), "posts", tree)
  return NextResponse.json(tree.children)
}
