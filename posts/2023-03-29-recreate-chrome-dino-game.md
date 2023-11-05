---
title: '开发Chrome小恐龙游戏Vol. 1：了解帧序列动画'
excerpt: "Chrome Dino is a built-in browser game developed by Google. It's small and great for learning Canvas and game development."
date: '2023-03-29'
hero: '/blogcontent/dino-sprite.png'
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

小恐龙的动作切换是使用的帧序帧动画。

```ts title="Trex.ts" showLineNumbers
Trex.animFrames = {
  WAITING: {
    frames: [44, 0],
    msPerFrame: 1000 / 3
  },
  RUNNING: {
    frames: [88, 132],
    msPerFrame: 1000 / 12
  },
  CRASHED: {
    frames: [220],
    msPerFrame: 1000 / 60
  },
  JUMPING: {
    frames: [0],
    msPerFrame: 1000 / 60
  },
  DUCKING: {
    frames: [264, 323],
    msPerFrame: 1000 / 8
  }
}
```

## 参考文章

- [Create a “secret” Dino Chrome Game in 1 hour with JS and Phaser 3](https://codeburst.io/create-a-secret-dino-chrome-game-in-1-hour-with-js-and-phaser-3-2caebb1abe2a)
- [从 Chrome 小恐龙游戏学习 2D 游戏制作](https://cloud.tencent.com/developer/article/1735228)
- [Chrome Dino Replica Game in JavaScript | HTML5 Canvas Tutorial](https://morioh.com/p/683df3b011b7)
- [Dinosaur Game Chrome - CodePen](https://codepen.io/MysticReborn/pen/rygqao)
- [Chrome 小恐龙游戏源码探究一 -- 绘制静态地面 #4](https://github.com/liuyib/blog/issues/4)
