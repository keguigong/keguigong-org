---
title: "整理了一些实用的JavaScript使用小技巧"
date: "2024-03-15"
author: keguigong
tags: ["tutorial", "usages", "skills"]
---

### 1. ACM 模式逐行读取输入文本

笔试的时候会使用到 ACM 模式，如输入一个 `m*n` 的矩阵，第一行为矩阵大小，后面 `n` 行为长度为 `m` 的文本。

如输入一个 `4x3` 的矩阵：

```
4 3
1 2 3 4
5 6 7 8
9 0 1 2
```

通过 `readline` 可以在终端中读取输入文本：

```js
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
```

但是读取的时候是逐行读取，所以需要在事件监听外侧声明变量用于记录矩阵数据，如矩阵大小。可以通过变量的值判断当前是第几行文本及是否输入完毕。

```js
let m = -1,
  n = -1
let row = 0
const matrix = []

rl.on("line", function (line) {
  if (m < 0) {
    const tokens = line.split(" ")
    m = parseInt(tokens[0])
    n = parseInt(tokens[1])
  } else if (row < n) {
    row++
    matrix.push(line.split(" ").map((s) => parseInt(s)))
    // do later calculations here.
  }
})
```

### 2. 创建二维数组

不出意外的话，我们会想到一个投巧的方法

```js
const a = new Array(10).fill(new Array(10).fill(false))
```

确实可以生成一个 `10x10` 的二维数组，但是每一行的对象其实是指向的是**同一个地址**。如果修改 `a[0][0] = true`，则第 0 列的值都会变成 0，因为 `a[*]` 指向的是同一个数组对象。

```js
a[0] === a[1] // true
a[1] === a[2] // true
```

正确的的方式应该是每一行都需要生成一个新的数组对象塞进去才可以。

_方法一：_

```js
const a = new Array(10)
for (let i = 0; i < a.length; i++) {
  a[i] = new Array(10).fill(false)
}
```

_方法二：_ 利用函数特性

```js
const a = Array.from(new Array(10), () => new Array(10).fill(false))
```

_方法三：_ 利用 `map()` 函数

```js
const a = new Array(10).map(() => new Array(10).fill(false))
```

### 3. 数组转化为链式调用

如果有 n 个异步任务需要逐个执行，前一个任务执行完了再执行下一个

```ts
function asyncTask() {
  return new Promise((res) => setTimeout(() => res()), 1000)
}
const tasks = [(asyncTask, asyncTask)]
```

_方法一：_ 通过 `Promise.then()` 将任务串联起来

```js
const p = Promise.resolve()
const res = tasks.reduce(async (p, task) => {
  await p
  await task()
}, p)
```

_方法二：_ 通过 `for` 循环，不过会卡住宏任务队列，

```js
async function helper() {
  for (let i = 0; i < tasks.length; i++) {
    await tasks[i]()
  }
}
helper()
```

### 参考链接

- [JavaScript 如何创建二维数组](https://juejin.cn/post/6968645442691137572)
