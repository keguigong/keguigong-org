import { Metadata } from "next"
import { description } from "@/package.json"

export const metadata: Metadata = {
  title: `Not Found - ${description}`
}

export default function NotFound() {
  return (
    <>
      <h1>Page Not Found</h1>
      <p>Sorry, nothing to see here.</p>
    </>
  )
}
