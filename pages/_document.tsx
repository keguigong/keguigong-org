import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document"
import { checkDarkMode, setMode } from "@/utils/toggle-theme"

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }

  render() {
    return (
      <Html>
        <Head>
          {/* <script
            dangerouslySetInnerHTML={{
              __html: `
              (function () {
                const LOCAL_THEME_KEY = "local_theme"
                const THEMES = {
                  DARK: "dark",
                  LIGHT: "light"
                }
                const mode = ${checkDarkMode()}
                console.log(mode)
                const setDarkMode = ${setMode}
                setDarkMode(mode)
              })()
            `
            }}
          ></script> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
