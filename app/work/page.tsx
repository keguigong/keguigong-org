import { Metadata } from "next"
import { md2html } from "@/utils/posts"
import { env } from "@/utils/env"

const title = "Work"
const description = "一些平时练习的作品"

export const metadata: Metadata = {
  title: `${title} | ${env.SITE_NAME}`,
  description,
  openGraph: {
    title,
    description,
    url: `${env.SITE_URL}/work`,
    siteName: env.SITE_NAME,
    images: [
      {
        url: `${env.OG_IMAGE_URL}/ogimage?title=${title}&path=${env.SITE_NAME}/work`
      }
    ]
  }
}

const md = `
> 🚧 待增加页面样式以及交互。

# 练习作品

1. [游戏角色选择器, 参考 Party Animals 风格](https://keguigong.github.io/role-picker-referring-to-party-animals/)

![Party Animals role picker](/images/party-animals-picker.jpg)

_Party Animals 这款游戏的美术和 UI 感觉还是很不错的，因此参照游戏内的界面，使用 JavaScript 仿造了一个角色选择组件。_

---

2. [创建一个自己的Chrome Dino小游戏](https://keguigong.github.io/chrome-dino/)

![Chrome Dino](/images/chrome-dino.png)

_Chrome Dino 是 Chrome 浏览器内置的一款小游戏，参照源码使用 TypeScript 自己写了一遍，目前已经完成原有功能的开发，后续考虑添加一些道具，如武器和技能，对应的需要绘制资源图片。_

---

3. [搜索框组件, 优化搜索体验](https://keguigong.github.io/search-box-component/)

![Search box component](/images/search-box-component.jpg)

_一个基础搜索组件，支持节流搜索、请求返回状态显示等。_

---

4. [B端平台: 故障分析与诊断平台](https://keguigong.github.io/sample-alarm-analysis-platform/)

---

5. [Android自定义控件: 使用自定义 View 绘制一个步进进度条](https://github.com/keguigong/android-step-progress-bar)
`

export default function Works() {
  const content = md2html(md)
  return <div data-markdown-body dangerouslySetInnerHTML={{ __html: content }}></div>
}
