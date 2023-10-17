---
title: "[WIP]使用Canvas开发Chrome小恐龙游戏"
date: "2023-03-29"
coverImage: "/blogcontent/dino-sprite.png"
excerpt: "The _Chrome Dino_ is a built-in browser game developed by Google. It's small and great for learning _Canvas_ and game development."
---

**绘制元素**

游戏的图片资源是一张 base64 格式的精灵图，可以使用工具 [Sprite Cow](http://www.spritecow.com/) 进行位置标记。

![dino-sprite](/blogcontent/dino-sprite.png)

Canvas `drawImage` 支持我们选取图片中的一部分进行区域绘制，其中 `sx` `sy` `sw` `sh` 分别为选择区域的起始坐标以及选择区域的宽高。

```ts
drawImage(image: CanvasImageSource, sx: number, sy: number, sw: number, sh: number, dx: number, dy: number, dw: number, dh: number): void
```

**帧序列动画**

小恐龙的动作切换是使用的帧序帧动画。

```ts
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

**参考文章**

- [Create a “secret” Dino Chrome Game in 1 hour with JS and Phaser 3](https://codeburst.io/create-a-secret-dino-chrome-game-in-1-hour-with-js-and-phaser-3-2caebb1abe2a)
- [从 Chrome 小恐龙游戏学习 2D 游戏制作](https://cloud.tencent.com/developer/article/1735228)
- [Chrome Dino Replica Game in JavaScript | HTML5 Canvas Tutorial](https://morioh.com/p/683df3b011b7)
- [Dinosaur Game Chrome - CodePen](https://codepen.io/MysticReborn/pen/rygqao)
- [Chrome 小恐龙游戏源码探究一 -- 绘制静态地面 #4](https://github.com/liuyib/blog/issues/4)
