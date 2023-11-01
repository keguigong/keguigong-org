---
title: 'JavaScript小知识：了解节流和防抖'
date: '2023-02-15'
hero: '/blogcontent/debounceThrottle.svg'
author: keguigong
---

节流和防抖在前端开发中使用的比较频繁，也是面试的时候几乎必问的问题，虽然名字比较高大上，但是原理其实比较简单。

## 为什么需要节流和防抖

使用 js 进行开发的时候，需要处理一些高频事件，如 `mousemove`，`resize` 以及 `keydown` 等事件，这些事件会频繁的调用回调函数，如 `mousemove` 可能在一小段距离上会调用上百次，有一些场景下我们希望它的执行有一个时间间隔，比如说 1 秒，对事件进行调用次数的限制，对此我们就可以采用防抖（debounce）和 节流（throttle） 的方式来减少调用频率。如果不做额外处理，容易造成性能资源的浪费。

![debounceThrottle.svg](/blogcontent/debounceThrottle.svg)

对节流和防抖的定义是

- **节流**：n 秒内只运行一次，若在 n 秒内重复触发，只有一次生效。
- **防抖**：n 秒后在执行该事件，若在 n 秒内被重复触发，则重新计时。

看到一个经典的比喻:

想象每天上班大厦底下的电梯。把电梯完成一次运送，类比为一次函数的执行和响应。假设电梯有两种运行策略 `throttle` 和 `debounce`，超时设定为 15 秒，不考虑容量限制。

- **节流**：电梯第一个人进来后，15 秒 后准时运送一次。
- **防抖**：电梯第一个人进来后，等待 15 秒。如果过程中又有人进来，15 秒等待重新计时，直到 15 秒后开始运送。

## 实现的原理

**节流**

利用 js 闭包特性实现一个简单的节流 `throttle` 函数。

```js
function throttle(fn, delay) {
  let start = Date.now()
  return function (...args) {
    let now = Date.now()
    if (now - start >= delay) {
      fn.apply(this, args)
      start = now
    }
  }
}
```

**防抖**

同样搭配定时器可以实现一个简单的防抖 `debounce` 函数。

```js
function debounce(fn, delay) {
  let timer
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}
```

## 应用场景

**节流**间隔一段时间执行一次回调，比如：

- `scroll` 滚动加载，加载更多或滚到底部监听。
- 搜索框，搜索联想功能。

**防抖**处理连续的事件，但只需触发一次回调，比如：

- `<input>` 对输入内容进行校验、发起请求等，等待用户输入完之后再进行。
- `resize` 事件等待窗口调整完成后，再进行后续计算。

**References:**

- [什么是防抖和节流？有什么区别？如何实现？](https://vue3js.cn/interview/JavaScript/debounce_throttle.html)
- [节流和防抖](https://underglaze-blue.github.io/blog/pages/af9354/)
