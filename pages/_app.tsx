import type { AppProps } from "next/app"
// Global styles
import "@/styles/globals.css"
// Import Prism code highlight styles
import "prism-themes/themes/prism-one-dark.css"
// Custom styles
import "@/styles/now-styles.scss"

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
