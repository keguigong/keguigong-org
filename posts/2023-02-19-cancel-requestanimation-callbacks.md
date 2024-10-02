---
title: "如何取消requestAnimationFrame发起的动画"
date: "2023-02-19"
author: keguigong
---

> 查看最终实现的效果：[Bouncing Balls Start](https://keguigong.github.io/bubble-sort-animation/bouncing-balls)。

最近在学习 2D `canvas` 有关知识，并参照 MDN 文档（[Let's bounce some balls](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_building_practice#lets_bounce_some_balls)）使用 `canvas` 编写一个碰撞小球程序，在将该程序结合 React Hook 进行开发的时候遇到了一些问题，这儿将一些遇到的问题以及对应的解决方案记录一下。

## `cancelAnimationFrame` 无法取消动画

原本的让小球动起来的部分如下，函数执行完 `return` 动画的 ID 并请求动画执行，继而实现动画的连续运行。通过获取到的 ID 用于后续的取消动画。

```js
// ball.js
function loop(...) {
  ...
  return start = () => {
    ctx.fillStyle = "rgba(0, 0, 0, 0.25)"
    ctx.fillRect(0, 0, width, height)

    for (let i = 0; i < balls.length; i++) {
      balls[i].draw(ctx)
      balls[i].update(width, height)
      balls[i].collisionDetect()
    }
    return requestAnimationFrame(start)
  }
}
```

```tsx
// bouncing-balls.tsx
useEffect(() => {
  ...
  // 开始动画，并开始自动进行，将第一次的ID保存下来
  const id = loop(...)()

  return () => {
    ...
    // 页面销毁，取消动画
    cancelAnimationFrame(id)
  }
})
```

这样操作动画并不能被取消，原因在于每一次 `requestAnimationFrame()` 返回的值都是不一样的，仅仅保存了第一次的 id，肯定无法通过这个 id 去取消后面正在进行的动画。正确做法是需要时刻更新 id，确保在取消的时候 id 是正在进行的动画。

```js
// 从start函数中移除
return requestAnimationFrame(start)
```

```tsx
useEffect(() => {
  ...
  let id = 0
  // 封装一个新的startFn，便于使用id保存最新的动画
  const startFn = () => {
    loop(...)()
    id = requestAnimationFrame(startFn)
  }
  id = requestAnimationFrame(startFn)

  return () => {
    ...
    cancelAnimationFrame(id)
  }
})
```

经过上述改造，在离开页面的时候运动会被正常的取消，避免资源未回收。

## 多次进入页面小球运动速度加快

原因是由于上次的 `requestAnimationFrame` 并没有被取消，页面离开之后画布以及创建的小球并未被销毁，再次进入页面的时候再次调用了 `requestAnimationFrame`，使得 `update()` 函数在同一个 `frame` 中被执行了两次，该函数主要用于移动小球，所以产生了小球移动速度加快的情况，正常取消动画问题得以解决。

```js
Ball.prototype.update = function (...) {
  ...
  // 通过每帧往位置上添加速度值，实现移动，加两次则移动速度加快
  this.x += this.velX
  this.y += this.velY
}
```

## 在 `useEffect` 中动画函数频繁被创建

创建小球比较耗费资源，如果在 `useEffect` 中直接创建，`Next.js` 会提示可以通过 `useCallback` 进行优化。同样的，我们进行改造。

```tsx
const memoLoop = useCallback(canvasCtx && width && height ? loop(canvasCtx, width, height) : () => {}, [
  canvasCtx,
  width,
  height,
])
```

将 `memoLoop` 用来保存 `loop` 函数返回的 `start` 函数，并且只有在 `canvasCtx`、`canvasCtx` 以及 `canvasCtx` 变化的时候才会重新调用 `loop` 函数。同样的，对于 `useEffect` 同样进行改造。

```tsx
useEffect(() => {
  ...
  let animationId = 0
  const loop = () => {
    memoLoop()
    animationId = requestAnimationFrame(loop)
  }
  animationId = requestAnimationFrame(loop)
  ...
}, [canvasCtx, width, height, memoLoop])
```

注意在 `useEffect` 中使用了 `memoLoop`，记得将其添加进数组中。

完整的代码在请看 [这里](https://github.com/keguigong/next-blog/tree/blog/components/bouncing-balls)。
