import { Metadata } from "next"

export const metadata: Metadata = {
  title: `Not Found`
}

export default function NotFound() {
  return (
    <>
      <h1>Page Not Found</h1>
      <p>Sorry, nothing to see here.</p>
    </>
  )
}
