---
title: '了解 JavaScript 的继承与原型链'
excerpt: '在使用 JavaScript 的时候会对原型以及原型链感到迷惑，写下这篇笔记帮助我理解原型链的概念以及继承的方式'
date: '2023-11-05'
author: keguigong
---

### 

### `Object` 和 `Function` 的原型

```js showLineNumbers
Function.__proto === Object.prototype
Function.prototype.__proto__ === Object.prototype
Object.__proto__ === Function.prototype
Object.prototype.__proto__ === null
```

### 参考链接

- [继承与原型链 - MDN Web Docs](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
