import Head from 'next/head'
import { md2html } from '@/utils/posts'

const siteTitle = 'Works'
const description = "Where keguigong's thoughts were built"
const title = siteTitle + ' - ' + description + ' - ' + '可圭共'
const md = `
> 🚧 待增加页面样式以及交互。

# 练习作品

1. [游戏角色选择器, 参考 Party Animals 风格](https://keguigong.github.io/role-picker-referring-to-party-animals/)

![Party Animals role picker](/images/party-animals-picker.jpg)

2. [搜索框组件, 优化搜索体验](https://keguigong.github.io/search-box-component/)

![Search box component](/images/search-box-component.jpg)

3. [B端平台: 故障分析与诊断平台](https://keguigong.github.io/sample-alarm-analysis-platform/)

4. [Canvas 练习: 碰撞小球](https://keguigong.github.io/bubble-sort-animation/bouncing-balls)

![Bouncing balls](/images/bouncing-balls.jpg)

5. [Canvas练习: 可视化冒泡排序过程](https://keguigong.github.io/bubble-sort-animation/)
6. [Android自定义控件: 使用自定义 View 绘制一个步进进度条](https://github.com/keguigong/android-step-progress-bar)
`

export default function Works({ content }: any) {
  return (
    <section>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            description
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <div data-markdown-body dangerouslySetInnerHTML={{ __html: content }}></div>
    </section>
  )
}

export async function getStaticProps() {
  const content = md2html(md)
  return {
    props: {
      content
    }
  }
}
