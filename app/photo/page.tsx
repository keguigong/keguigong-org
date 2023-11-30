import { Metadata } from "next"
import { md2html } from "@/utils/posts"
import { env } from "@/utils/env"

const title = "Photo"
const description = "平时拍摄的一些照片"

export const metadata: Metadata = {
  title: `${title} | ${env.SITE_NAME}`,
  description,
  openGraph: {
    title,
    description,
    url: `${env.SITE_URL}/photo`,
    siteName: env.SITE_NAME,
    images: [
      {
        url: `${env.OG_IMAGE_URL}/api/ogimage?title=${title}&path=${env.SITE_NAME}/photo`
      }
    ]
  }
}

const md = `
> 🚧 开发中

计划有一个地方可以放置一些自己拍的照片，并简单的按照主题、日期或者相册的形式进行整理，其他希望能够实现的效果大致罗列如下

1. 照片的详细信息。包括光圈等参数信息和说明
2. 时间线。可以按照时间线的形式展示照片
3. 列表可以像苹果相册一样放大缩小
4. 加载优化，通过 Progressive JPEG 的形式或者其他
5. 能够有一些类似于 SharedComponent 一样的图片交互动画


同时需要考虑一下图片托管的问题，直接放在 git 中可能存在着无法进行检索以及加载优化的。如果使用 CDN 鉴权啥的\
也需要考虑一下，毕竟不希望被任意访问到图片。

参考作品：

1. [MyerSplash - JuniperPhoton](https://apps.apple.com/cn/app/myersplash/id1486017120?l=en)
2. [Recent Photo Album Page Concept - Crank](https://dribbble.com/shots/5765509-Recent-photo-album-page-concept)
3. [Photo Album for Your Memories - Lisa Ermakova](https://dribbble.com/shots/21955003-Photo-album-for-your-memories)
4. [Photo Album Animation - Yifan Ding](https://dribbble.com/shots/5967883-Photo-Album-Animation)
5. [Photo Wall Wip - Jon Lackey](https://dribbble.com/shots/2353098-Photo-Wall-Wip)
6. [Wall Calendar 2019 - bulbul_bab](https://dribbble.com/shots/5334334-Wall-Calendar-2019)
`

export default function Photo() {
  const content = md2html(md)
  return <div data-markdown-body dangerouslySetInnerHTML={{ __html: content }}></div>
}
