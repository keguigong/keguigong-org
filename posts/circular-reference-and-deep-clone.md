---
title: "JavaScript对象循环引用和深拷贝"
date: "2023-02-15"
---

定义一个对象 `a`，`a` 含有属性 `b` 和 `c`，`c` 属性指向自己，即 `a`，则构成循环引用（[Circular Reference](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Memory_Management)）。

```js
let a = { b: "hello world!" }
a.c = a
```

在 Node.js 环境运行，输出提示循环引用 `[Circular * 1]`

```jsx
console.log(a);

< ref * 1 > { b: "hello world!", c: [Circular * 1] }
```

在 Chrome 种运行，输出

```jsx
console.log(a);

{b: 'hello world!', c: {…}}
  b: "hello world!"
  c:
    b: "hello world!"
    c:
      b: "hello world!"
      c: {b: 'hello world!', c: {…}}
      [[Prototype]]: Object
    [[Prototype]]: Object
  [[Prototype]]: Object
```

发现构成循环引用之后，会输出一个层级无限深的对象。如果现在需要对对象 `a` 进行拷贝，单纯用递归函数进行处理，则会造成内存溢出，因为永远处理不完。所以针对循环引用的场景，在拷贝的时候需要进行单独的处理。

假设拷贝对象 `target` 只为基础对象类型，使用下面的简易 `clone()` 函数拷贝对象 `a`

```js
function clone(target) {
  if (typeof target !== "object") return target
  let obj = {}
  for (const key in target) {
    obj[key] = clone(target[key])
  }
  return obj
}

clone(a)
```

则会产生溢出错误 `Uncaught RangeError: Maximum call stack size exceeded`。

[`Map`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map) 的 `key` 可以存储对象，且不能相同，可以用来存储一下每次拷贝的值，考虑到回收的问题，我们最终采用 `WeakMap` 来保存每次拷贝的值，下次深拷贝前，先判断下是否已有相同对象存在，若有，直接返回对应的对象即可，解决循环引用的问题，不再一层一层递归下去。

```js
function clone(target) {
  const map = new WeakMap()
  function _clone(target) {
    if (typeof target !== "object") return target
    if (map.get(target)) return target
    let res = {}
    map.set(target, res)
    for (let key in target) {
      res[key] = _clone(target[key])
    }
    return res
  }
  return _clone(target)
}
```

```jsx
clone(a)

{b: 'hello world!', c: {…}}
  b: "hello world!"
  c:
    b: "hello world!"
    c:
      b: "hello world!"
      c: {b: 'hello world!', c: {…}}
      [[Prototype]]: Object
    [[Prototype]]: Object
  [[Prototype]]: Object
```

使用该方法就可以解决循环引用的拷贝问题。其他类型的拷贝请参照对应的文章即可。

**References:**

- [从深拷贝看 JS 中的循环引用](https://underglaze-blue.github.io/blog/pages/831fd5/)
- [js 之路 深拷贝与浅拷贝](https://juejin.cn/post/7134970746580762637)
