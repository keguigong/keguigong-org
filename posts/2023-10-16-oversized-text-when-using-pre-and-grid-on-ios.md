---
title: '在iOS上使用pre搭配grid布局时, 文本大小显示异常'
date: '2023-10-16'
author: keguigong
tags: ['problem', 'css']
---

近日想优化一下 Markdown 代码块的显示，所以引入了 [rehype-pretty-code](https://rehype-pretty-code.netlify.app/) 用于代码块的解析和高亮。

使用之后发现一个问题，代码块在桌面和安卓设备上均显示正常，但是在 iOS 移动设备上，代码块的文本大小会很大。 直接修改文本大小作用不大，仔细检查样式也未发现有直接修改文本大小的设置。

[oversized-text.jpg](/blogcontent/oversized-text.jpg)

网页的元素层级如下：

```tsx title="App.tsx" showLineNumbers {2,5}
<pre className="overflow-x">
  <code className="display-grid">
    <span data-line>...</span>
    <span data-line>...</span>
  </code>
<pre>
```

### 问题分析

rehype-pretty-code 对 code 添加了 grid 布局，以此来更加方便的高亮某一行代码，高亮背景可以充满一整行。

> A **grid** style is present by default which allows line highlighting to span the entire width of a horizontally-scrollable code block.

发现如果不在 pre 或者 code 元素上使用 grid 布局，文本大小显示正常。所以怀疑是不同的平台或者浏览器内核对于 pre 或者 grid 处理不太统一，导致显示过大。搜索之后找到了问题的答案，[Why is flex affecting font size on iOS?](https://stackoverflow.com/questions/38346494/why-is-flex-affecting-font-size-on-ios)，不单是 pre 或者特定元素在 iOS 上存在文本显示异常的问题，而是 WebKit 导致的。

> WebKit has an annoying function (for a properly designed responsive site) of trying to **enlarge** the font for the "primary" text on the screen, where primary is simply it's best guess.

在移动平台的 WebKit 会自动去放大一些“主要”的文本，但是这个”主要“的文本是 WebKit 去决定的，使用 pre + grid 显然被认为是主要文本，所以 WebKit 将其放大显示。

可以通过 [`text-size-adjust`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-size-adjust) 属性去修改这一行为。text-size-adjust 还是一个实验选项，本意是控制手机或平板设备上使用的文本溢出算法，防止屏幕太小无法正常阅读，所以将一些文本进行放大。

> Since text that has been scaled down to fit a mobile screen may be very small, many mobile browsers apply a text inflation algorithm to enlarge the text to make it more readable.

但是在 WebKit 上，浏览器的擅作主张影响了我们的使用。

### 解决方案

我们可以简单的将 text-size-adjust 设置为 100%即可。

```css title="global.css" showLineNumbers
body {
  text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  -moz-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
}
```

由于目前只有 WebKit 有类似的行为，也可以只设置 -webkit-text-size-adjust

```css title="global.css" showLineNumbers
body {
  -webkit-text-size-adjust: 100%;
}
```

### 参考链接

- [text-size-adjust - MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/text-size-adjust)
- [Wrong font size when using float right in CSS on Mobile Safari](https://stackoverflow.com/a/22417120)
- [Why is flex affecting font size on iOS?](https://stackoverflow.com/questions/38346494/why-is-flex-affecting-font-size-on-ios)
