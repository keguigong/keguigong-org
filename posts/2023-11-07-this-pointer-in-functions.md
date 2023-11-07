---
title: '函数中的this指针到底指向哪儿？'
date: '2023-11-07'
author: keguigong
tags: ['tutorial', 'function', 'this']
---

### `this` 的指向问题

`this` 在对象中的使用的时候指向十分清晰，但是在函数中使用的话，容易让人感到迷惑，比如下面的例子。

```js title="Example 1" showLineNumbers {-1}
class A {
  func1 = function () {
    return this
  }
  func2 = () => {
    return this
  }
}

const instA = new A()
const { func1, func2 } = instA
console.log(func1(), func2()) // What to print?
```

```js title="Example 2" showLineNumbers
var name = 'Say hello.'
function func1() {
  console.log(this.name)
}
const func2 = () => {
  console.log(this.name)
}
const obj = {
  name: 'Say goodbye.',
  method: function (fn1, fn2) {
    fn1()
    fn2()
    arguments[0]()
  }
}

obj.method(func1, func2, 1) // What to print?
```

### 参考链接

- [ES6 箭头函数的 this 指向详解](https://www.zhihu.com/tardis/zm/art/57204184?source_id=1003)
