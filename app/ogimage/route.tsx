import puppeteer from "puppeteer"
import Handlebars from "handlebars"
import { env } from "@/utils/env"
import { NextRequest } from "next/server"

// export const runtime = "nodejs"

// export const dynamic = "force-dynamic"

function getFontSize(title = "") {
  if (!title || typeof title !== "string") return ""
  const titleLength = title.length
  if (titleLength > 55) return "2.75rem"
  if (titleLength > 35) return "3.25rem"
  if (titleLength > 25) return "4.25rem"
  return "4.75rem"
}

const templateStyles = `
@font-face {
  font-family: Inter;
  src: url(https://fonts.googleapis.com/css2?family=Inter:wght@500&display=swap);
}
* {
  box-sizing: border-box;
}
:root {
  font-size: 16px;
  font-family: Source Code Pro, monospace;
}
body {
  padding: 2.5rem;
  height: 90vh;
  background: #042f7d;
  {{#if bgUrl}}
  background-image: url({{bgUrl}});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  {{else}}
  background: linear-gradient(to right, #042f7d, #007eff);
  color: #00ffae;
  {{/if}}
}
main {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.logo {
  width: 15rem;
  height: 3rem;
}
.logo img {
  width: 100%;
  height: 100%;
}
.logo span {
  font-size: 2rem;
  color: yellow;
  font-style: italic;
  text-decoration: wavy;
}
.title {
  font-size: {{fontSize}};
  margin: 0.25rem 0;
  font-weight: bold;
}
.tags {
  display: flex;
  list-style-type: none;
  padding-left: 0;
  color: #ff00d2;
  font-size: 1.5rem;
}
.tag-item {
  margin-right: 0.5rem;
}
.path {
  color: #6dd6ff;
  font-size: 1.25rem;
}
`

const templateHTML = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <style>{{styles}}</style>
  </head>
  <body id="body">
    <main>
      <div class='logo'>
        {{#if logoUrl}}
          <img src="{{logoUrl}}" alt="logo" />
        {{else}}
          <span>{{siteName}}</span>
        {{/if}}
      </div>
      <div class="title">{{title}}</div>
      <div>
        {{#if tags}}
          <ul class="tags">
          {{#each tags}}
            <li class="tag-item">#{{this}}</li>
          {{/each}}
          </ul>
        {{/if}}
        {{#if path}}
          <p class="path">{{path}}</p>
        {{/if}}
      </div>
    </main>
  </body>
</html>
`

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const title = searchParams.get("title") || ""
  const path = searchParams.get("path") || ""

  // const fontsData = fetch(new URL("./NotoSerifSC-SemiBold.otf", import.meta.url)).then((res) => res.arrayBuffer())

  const compiledStyles = Handlebars.compile(templateStyles)({
    fontSize: getFontSize(title)
  })
  // compiled HTML
  const compiledHTML = Handlebars.compile(templateHTML)({
    styles: compiledStyles,
    siteName: env.SITE_NAME,
    title,
    path
  })
  // Launch Headless browser and capture creenshot
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--headless", "--no-sandbox", "--disable-dev-shm-usage"],
    defaultViewport: {
      width: 1200,
      height: 630
    }
  })
  const page = await browser.newPage()
  // Set the content to our rendered HTML
  await page.setContent(compiledHTML, { waitUntil: "domcontentloaded" })
  // Wait until all images and fonts have loaded
  await page.evaluate(async () => {
    const selectors = Array.from(document.querySelectorAll("img"))
    await Promise.all([
      document.fonts.ready,
      ...selectors.map((img) => {
        // Image has already finished loading, let’s see if it worked
        if (img.complete) {
          // Image loaded and has presence
          if (img.naturalHeight !== 0) return
          // Image failed, so it has no height
          throw new Error("Image failed to load")
        }
        // Image hasn’t loaded yet, added an event listener to know when it does
        return new Promise((resolve, reject) => {
          img.addEventListener("load", resolve)
          img.addEventListener("error", reject)
        })
      })
    ])
  })

  const element = (await page.$("#body"))!
  const image = await element.screenshot({ omitBackground: true })
  await browser.close()

  return new Response(image, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
      "Content-Type": "image/png",
      "Cache-Control": `immutable, no-transform, s-max-age=2592000, max-age=2592000`
    }
  })
}
