import { getSortedPostsData } from "@/utils/posts"
import Link from "next/link"
import Date from "../components/date"
import utilStyles from "@/styles/utils.module.css"
import Layout from "../components/layouts/layout"

export default function Home({ allPostsData }: { [key: string]: any }) {
  return (
    <Layout home>
      <section>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title, type }: { [key: string]: any }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={type === "article" ? `/articles/${id}` : `/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}
