import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document"

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }

  render() {
    return (
      <Html data-color-mode="auto" data-light-theme="light" data-dark-theme="dark">
        <Head>
          <script
          // dangerouslySetInnerHTML={{
          //   __html: `
          //   (function () {
          //     console.log('loading')
          //   })()
          // `
          // }}
          ></script>
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
