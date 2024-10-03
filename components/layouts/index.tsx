import Link from "next/link"

interface Props {
  children?: React.ReactNode
  home?: boolean
}

export function Layout({ children, home }: Props) {
  return (
    <>
      <main className="min-h-screen p-6 pt-3 md:pt-6">{children}</main>
      <footer className="mx-auto my-4 flex h-4 justify-between px-4 text-sm">
        {!home ? (
          <div>
            <Link href="/">← Back</Link>
          </div>
        ) : (
          <div>
            With <a href="https://www.nextjs.org/">Next.js</a>.
          </div>
        )}
        <div>
          <a href="https://github.com/keguigong">GitHub</a> • <a href="https://www.behance.net/keguigong">Behance</a> •{" "}
          <a href="https://www.instagram.com/keguigong/">Instagram</a>
        </div>
      </footer>
    </>
  )
}
