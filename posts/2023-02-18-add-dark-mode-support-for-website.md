---
title: '如何为网站添加暗黑模式并手动切换'
date: '2023-02-18'
author: keguigong
---

> 从 iOS13 开始，苹果引入了暗黑模式 `Dark Mode`, macOS 也在不久后支持了暗黑模式，自此开始，Android、Chrome 以及 Windows 也悉数跟进，都支持了暗黑模式，提供了相应的接口以及开发手册，不少 App 也都新增了暗黑模式，方便在暗光条件下使用。到现在为止，暗黑模式几乎成为了一个成熟产品的标配，表明开发者是尊重用户使用感受以及平台规范的。

在浏览器中，Chrome 从 Chrome 74 开始支持了内建的暗黑模式（[Google Chrome gained a built-in dark theme on Windows in Chrome 74.](https://www.howtogeek.com/360650/how-to-enable-dark-mode-for-google-chrome/)），能够根据操作系统的应用主题切换暗黑模式，我们也可以方便的为网站增添支持。

## 纯 CSS 的模式自动切换

在不使用 JS 的前提下，使用 `@media` 以及 CSS 变量可以方便的为自己的网站添加支持。

使用 `prefers-color-scheme` （了解 [prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)）查询当前系统主题设置，并设置对应的 CSS 变量，可以实现 `dark` `light` 模式之间跟随系统主题自动切换。

```css
:root {
  --foreground-rgb: 0, 0, 0;
  --background-rgb: 214, 219, 220;
}

@media (prefers-color-scheme: dark) {
  :root {
    --foreground-rgb: 255, 255, 255;
    --background-rgb: 0, 0, 0;
  }
}
```

在使用的时候注意需要跟随主题变化的量都是用变量表示即可，这样在切换的时候就会自动使用对应主题下的变量了。

```css
blockquote {
  color: rgba(var(--foreground-rgb), 0.5);
  background: rgba(var(--background-rgb), 0.5);
  ...;
}
```

同时需要注意这个时候浏览器的自带控件并不会自己切换主题，需要我们通过 `color-scheme` 设置一下。

```css
@media (prefers-color-scheme: dark) {
  html {
    color-scheme: dark;
  }
}
```

使用 CSS 的方法简单高效，能够跟随系统自动切换，但是缺点是用户不能手动切换主题。

## 使用 JavaScript 搭配 CSS 变量

搭配 JavaScript 可以动态的修改主题，通过往 `html`/`body` 标签上添加或者移除 `class="light"` 可以实现对 `:root` 中定义的变量的覆盖，实现主题的切换。

```css
.light {
  --foreground-rgb: 0, 0, 0;
  --background-rgb: 214, 219, 220;
}

.dark {
  --foreground-rgb: 255, 255, 255;
  --background-rgb: 0, 0, 0;
}
```

我们使用搭配按钮以及 js 对 `html` 标签上添加 `dark`/`light`的 `class`，实现覆盖变量，主题得以切换。首先我们要获取到当前系统的主题设置，通过

```ts
window.matchMedia('(prefers-color-scheme: dark)').matches
```

来查询当前是否为暗黑模式，然后设置当前主题，使用函数 `setMode`，然后我们也不希望刷新页面导致主题丢失，所以将主题名称保存在 `localStorage` 中。

```ts
export function setMode(darkMode: boolean) {
  if (typeof document == 'undefined') return
  let classNames = document.documentElement.classList
  if (classNames.contains('dark')) classNames.remove('dark')
  if (classNames.contains('light')) classNames.remove('light')
  classNames.add(darkMode ? 'dark' : 'light')
  localStorage.setItem('darkMode', darkMode ? 'dark' : 'light')
}
```

页面加载的时候需要首先读取 `localStorage` 中保存的主题，如果没有再使用系统当前的主题即可。

```ts
export function checkDarkMode() {
  if (typeof window === 'undefined') return false
  let localMode = localStorage.getItem('darkMode')
  if (localMode === 'dark' || localMode === 'light') {
    return localMode === 'dark'
  } else {
    const darkModeMedia = window.matchMedia('(prefers-color-scheme: dark)')
    return darkModeMedia.matches
  }
}
```

设置完之后我们的网页就会变成这样，`.dark` 中的所有变量都会挂载到 `html` 上并且可以全局访问到。

```html
<html lang="en" class="dark">
  <head>
    ...
  </head>
  <body>
    ...
  </body>
</html>
```

## 设置自动切换

使用上面的方案会丢失自动跟随系统切换主题的功能，我们需要单独处理一下，有如下两种方法

- 借用 CSS 自己的能力，在设置为 `auto` 的时候，将 `light`/`dark` 样式移除，回退回默认的样式，在默认样式使用前文中的方案一，但是优先级低于 `light`/`dark`，以保证能够覆盖样式。
- 使用 js 直接监听主题变化，并赋予对应的样式。

### 搭配 CSS 自动切换

在 `light` `dark` 样式之前，添加基础样式，因为样式会在 `:root` 和 `.dark` 中复用，所以我们使用 `scss` 开发以实现样式复用

```scss
@mixin light {
  --foreground-rgb: 0, 0, 0;
  --background-rgb: 214, 219, 220;
}

@mixin dark {
  --foreground-rgb: 255, 255, 255;
  --background-rgb: 0, 0, 0;
}

:root {
  @include light();
}

@media (prefers-color-scheme: dark) {
  :root {
    @include dark();
  }
}

.light {
  @include light();
}

.dark {
  @include dark();
}
```

在主题切换设置为 `auto` 的时候，使用函数 `clearMode` 清除掉样式覆盖，让浏览器自己去决定什么主题。

```ts
export function clearMode() {
  if (typeof document == 'undefined') return
  let classNames = document.documentElement.classList
  if (classNames.contains('dark')) classNames.remove('dark')
  if (classNames.contains('light')) classNames.remove('light')
  localStorage.removeItem('darkMode')
}
```

### 使用 JS 添加事件监听

也可以直接通过事件监听直接改变样式，通过监听 `prefers-color-scheme: dark` 系统是否是暗黑模式实现监听。

```ts
export function watchDarkMode(cb: (e: boolean) => void) {
  if (typeof window === 'undefined') return () => {}
  const darkModeMedia = window.matchMedia('(prefers-color-scheme: dark)')
  const listener = () => cb.call(undefined, darkModeMedia.matches)
  darkModeMedia.addEventListener('change', listener)
  return () => darkModeMedia.removeEventListener('change', listener)
}
```

注意看我们返回了一个函数，这个主要是方便 `listener` 的清除，尤其是在使用 React Hook 的时候，会频繁的创建监听，需要注意清除。

```tsx
const [darkMode, setDarkMode] = useState(false)

useEffect(() => {
  let removeListener = watchDarkMode((darkMode) => {
    // Change theme icon
    setDarkMode(darkMode)
    // Add styles to html tag
    setMode(darkMode)
  })

  return function () {
    // Remove listener
    removeListener()
  }
})
```

至此，我们就完成对于网站暗黑模式的支持，但是还有一些问题可以优化

- 两套样式都需要加载，如果网站较大样式较多，会占用比较多的加载事件，最好是可以动态加载。
- 目前是加载完之后再通过 js 去修改样式，如果设置主题与系统主题不一样，会出现短暂的白屏或者黑屏，还需要想办法将主题第一次设置的时机提前。
