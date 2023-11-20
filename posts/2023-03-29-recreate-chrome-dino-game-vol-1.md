---
title: '开发Chrome小恐龙游戏Vol. 1：了解帧序列动画'
excerpt: 'Chrome Dino是Google开发的一款内置于Chrome的游戏，用于离线时打发时间。这个游戏很小，非常适合用来学习Canvas绘图以及了解基础的游戏开发环节。'
date: '2023-03-29'
author: keguigong
---

> 《恐龙游戏》（Dinosaur Game）是一款由 Google 开发、内置于 Google Chrome 的网页游戏。

计划按照以下步骤进行任务分解以及开发：

| 步骤                   | 说明                                                   | 难度            |
| ---------------------- | ------------------------------------------------------ | --------------- |
| 绘制静态地面           | 绘制静态的地面，熟悉画布的操作以与基本绘制             | ⭐️             |
| 让地面运动起来         | 如何制作动画以及常见的计算优化方式                     | ⭐️             |
| 随机绘制云朵           | 云朵为随机生成，但是运动的速度以及轨迹和地面是不同步的 | ⭐️⭐️          |
| 随机绘制障碍           | 障碍物有两种，仙人掌和翼龙，不同的是运动速度不一样     | ⭐️⭐️⭐️       |
| 小恐龙的运动           | 小恐龙有自己的动作，可以被操作，实现跳跃、下蹲灯操作   | ⭐️⭐️⭐️⭐️    |
| 碰撞检测               | 通过逐帧的计算，判定游戏结果                           | ⭐️⭐️⭐️⭐️⭐️ |
| 游戏结果展示和其他要素 | 展示结果以及其他要素                                   | ⭐️⭐️⭐️       |

这是整个过程的第一步，先熟悉一下绘制的基本接口和动画的原理等。

## 绘制元素

游戏的图片资源是一张 base64 格式的精灵图，可以使用工具 [Sprite Cow](http://www.spritecow.com/) 进行位置标记。

![dino-sprite](/blogcontent/dino-sprite.png)

Canvas `drawImage` 支持我们选取图片中的一部分进行区域绘制，其中 `sx` `sy` `sw` `sh` 分别为选择区域的起始坐标以及选择区域的宽高。

```ts
drawImage(image: CanvasImageSource, sx: number, sy: number, sw: number, sh: number, dx: number, dy: number, dw: number, dh: number): void
```

## 帧序列动画

小恐龙的动作切换是使用的帧序帧动画，用奔跑的动画来说明

```ts showLineNumbers
const RUNNING = {
  frames: [88, 132],
  msPerFrame: 1000 / 12
}
```

- `frames` 动画的帧数。奔跑由两帧构成，交替使用形成奔跑的效果
- `msPerFrame` 每一帧保持的时长。绘制的时候通过浏览器的 `requestAnimationFrame` 来进行绘制，每秒执行 60 次，但是我们两帧切换如果也按照 60 帧则太快了，所以规定了每一帧的时长，间隔 `msPerFrame` 时间切换到下一帧

对应的，在绘制的时候我们动画的时长应当通过时间去计算，而不是帧数，需要将帧数转化为时间。如果按照帧数计算，120FPS 刷新率的设备动画就回避 60FPS 的设备快一倍，显然不是我们期望看到的。

通过如下方法绘制，记录每一帧存在的时长

```ts showLineNumbers {13,16,20}
class Trex {
  frames = []
  msPerFrame: 1000 / 12

  prevTime = 0 // 记录上一次绘制的时间
  timer = 0 // 记录帧已经存在的时间
  currentFrame = 0 // 用于记录当前绘制哪一帧

  update() {
    const now = Date.now()
    const deltaTime = now - (this.prevTime || now)
    this.prevTime = now
    this.timer += deltaTime

    // 如果计时超过一帧的时间，则绘制下一帧
    if (this.timer >= this.msPerFrame) {
      this.currentFrame = this.currentFrame === this.frames.length - 1
        ? 0
        : this.currentFrame + 1
      this.timer = 0 // 切换到下一帧后重新开始计时
    }
  }
}
```

有一些场景需要通过 FPS 进行计算帧动画，但是同样需要将 FPS 转化为时间。如我们定义整个地面移动的速度的时候，一般会定义为每刷新一帧移动的像素距离，如 6 pixel per frame。那我们计算移动的像素可以通过

```ts showLineNumbers
const FPS = 60
const msPerFrame = 1000 / FPS
const currentSpeed = 6
const deltaTime = now - (prevTime || now)

let distance = (currentSpeed * deltaTime) / msPerFrame
```

进行计算。

## 参考文章

- [Create a “secret” Dino Chrome Game in 1 hour with JS and Phaser 3](https://codeburst.io/create-a-secret-dino-chrome-game-in-1-hour-with-js-and-phaser-3-2caebb1abe2a)
- [从 Chrome 小恐龙游戏学习 2D 游戏制作](https://cloud.tencent.com/developer/article/1735228)
- [Chrome Dino Replica Game in JavaScript | HTML5 Canvas Tutorial](https://morioh.com/p/683df3b011b7)
- [Dinosaur Game Chrome - CodePen](https://codepen.io/MysticReborn/pen/rygqao)
- [Chrome 小恐龙游戏源码探究](https://github.com/liuyib/blog/issues/4)
