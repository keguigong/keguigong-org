---
title: '了解一下JavaScript中的Number类型'
date: '2022-11-23'
hero: '/blogcontent/IEEE_754_Double_Floating_Point_Format.svg'
author: keguigong
---

> 这篇笔记主要是在看了掘金上 [全栈然叔](https://juejin.cn/user/1978776660216136) 的“365 天打卡记录”整理而来的，发现就算是 js 这种和 byte 打交道比较少的语言，在处理数字上也会有一些注意点。

## Number 的存储形式

JavaScript 内部，所有数字都是以 64 位浮点数形式储存，即使整数也是如此。所以，1 与 1.0 是相同的，是同一个数。

```js
typeof 1 // number
typeof 1.0 // number
1 === 1.0 // true
```

## 浮点数的结构

根据国际标准 [IEEE 754](https://en.wikipedia.org/wiki/IEEE_754)，JavaScript 浮点数包含 64 个二进制位。

<figure>
  <img src="/blogcontent/IEEE_754_Double_Floating_Point_Format.svg" alt="IEEE 754 Double Floating-Point Format"/>
  <figcaption>
  <cite><a href="https://commons.wikimedia.org/wiki/File:IEEE_754_Double_Floating_Point_Format.svg">IEEE 754 Double Floating Point Format</a></cite>
   by Codekaizen, CC BY-SA 4.0, via Wikimedia Commons
</figcaption>
</figure>

- 第一部分（蓝色）：用来存储符号位（sign），第 1 位：符号位，0 表示正数，1 表示负数
- 第二部分（绿色）：用来存储指数（exponent），第 2 位到第 12 位（共 11 位），指数部分
- 第三部分（红色）：用来存储小数（fraction），第 13 位到第 64 位（共 52 位），小数部分（即有效数字）

fraction 决定了整数安全表示范围，也就是

```
(-1)^s * f * 2^e
```

- 符号部分 -1 or 1
- f 的范围为 `1<=f<2`，使用 52 位表示
- 指数有正有负，指数位长度为 11 比特，所以能表示的数字范围为 0~2047

所以最大位应该由 f 决定，也就是说所有的 52 位用作表示整数部分。

## 52 位为什么可以表示 53 位小数

因为小数部分只需要表示尾数就可以，整数部分可定等于一。52 位太多不好理解，假设我们以 3 位(bit)数。

`b0.10` 可以表示为 `1.00 * 2^-1`

`b0.01` 可以表示为 `1.00 * 2^-2`

这样的话由于整数部分一定等于 1，所以可以把整数部分省略，也就是说 3 位数可以表示做小数表示的时候可以表示 4 位小数。

## 整数的表示范围

```js
Math.pow(2, 53) - 1 // 最大
Number.MAX_SAFE_INTEGER - // 常数表示
  (Math.pow(2, 53) - 1) // 最小
Number.MIN_SAFE_INTEGER // 常数表示
```

## 小数的计算

小数使用乘二取整法，我们用 0.75 举例，所有整数部分连接起来正好是 0.75 的二进制部分。

```
0.75 * 2 = 1.5 取整 1 剩下 0.5
0.5 * 2 = 1 取整  1 剩下 0 运算结束
```

而 0.1 和 0.2 情况有所不同

```
0.1 * 2 = 0.2 取整 0 剩下 0.2
0.2 * 2 = 0.4 取整 0 剩下 0.4
0.4 * 2 = 0.8 取整 0 剩下 0.8
0.8 * 2 = 1.6 取整 1 剩下 0.6
0.6 * 2 = 1.2 取整 1 剩下 0.2
0.2 * 2 = 0.4 取整 0 剩下 0.4
0.4 * 2 = 0.8 取整 0 剩下 0.8
0.8 * 2 = 1.6 取整 1 剩下 0.6
0.6 * 2 = 1.2 取整 1 剩下 0.2
...
```

所以在有限精度内是无法取到五分之一和十分之一的，所以有限的 52 个 bit 是无法表示 0.1 这种数字的唯一的方法就是截取。

```bash
0.1 + 0.2
// 0.30000000000000004
```

```bash
0.1 + 0.2 === 0.3 // false

0.75.toString(2)  // '0.11'
(0.1).toString(2) // '0.0001100110011001100110011001100110011001100110011001101'
(0.2).toString(2) // '0.001100110011001100110011001100110011001100110011001101'
```

## 判断 0.1、0.2 类似的数相等

随着使用二进制位数的增加精度会越来越高，但是譬如五分之一、十分之一是永远无法表示的。可以通过判断是否小于机器精度来判断是否相等，机器精度为 `Number.EPSILON = 2^-52`

```js
function numberEpsilon(a, b) {
  return Math.abs(a - b) < Number.EPSILON
}
```

**References:**

- [Day01 JS 整数是怎么表示的](https://juejin.cn/post/7048191028280426526)
- [JavaScript 中的数字存储](https://fengmumu1.github.io/2018/06/30/js-number/)
- [Day02 - 0.1 + 0.2 === 0.3 嘛](https://juejin.cn/post/7048554678858022925)
- [JavaScript 中 0.1+0.2 为什么不等于 0.3？如何实现等于 0.3?](https://aiguangyuan.blog.csdn.net/article/details/121323574)
