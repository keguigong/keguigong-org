---
title: "了解 JavaScript 的继承与原型链"
excerpt: "在使用 JavaScript 的时候对原型有一些迷惑，这篇笔记用于理解 JavaScript 原型链以及继承方式"
date: "2023-10-20"
author: keguigong
tags: ["tutorial", "prototype"]
---

### 原型和原型链

首先认识一下原型的定义

> Every JavaScript **object** has a second JavaScript object (or null, but this is rare) associated with it. This second object is known as a **prototype**, and the first object **inherits properties** from the prototype.
>
> [_JavaScript: The Definitive Guide_](https://js.okten.cn/posts/ch6/#623-prototypes)

每一个 JavaScript 对象都和另一个对象相关联，另一个对象就是原型，每一个对象都从原型继承属性。

具体实现中，每个对象都有一个 `__proto__` 属性，指向一个名为原型（Prototype）的对象，由此产生了“关联”。原型本身也有 `__proto__` 属性，指向原型的原型，直到最后不再需要继承任何属性，这个链状结构名为原型链（Prototype Chain）。

同时，需要知道原型属性正式名称为 [[Prototype]] 而非 `__proto__`，可以理解为 `__proto__` 是 [[Prototype]] 插槽的一种实现，用于访问原型对象。

> 遵循 ECMAScript 标准，符号 `obj.[[Prototype]]` 用于标识 obj 的原型。内部插槽 [[Prototype]] 可以通过 `Object.getPrototypeOf()` 和 `Object.setPrototypeOf()` 函数来访问。这个等同于 JavaScript 的非标准但被许多 JavaScript 引擎实现的属性 `__proto__` 访问器。

对象可再分为函数对象和普通对象，但是只有函数对象才有 `prototype` 属性。普通对象和函数对象的原型指向也不太一样，但是都是指向构造他们的函数对象的 `prototype`。

```js showLineNumbers {6,8}
const o1 = { a: 1 }
const func1 = function () {
  this.a = 1
}

o1.__proto__ === Object.prototype // true
// o1 ---> Object.prototyoe ---> null
func1.__proto__ === Function.prototype // true
// o2 ---> Function.prototype ---> Object.prototype ---> null
```

### 基于原型链的继承

JavaScript 通过沿着原型链向上查找的方式寻找属性及方法，实现属性和方法的继承。同时，原型的指向可以随时修改。

> JavaScript 对象有一个指向一个原型对象的链。当试图访问一个对象的属性时，它不仅仅在该对象上搜寻，还会搜寻该对象的原型，以及原型的原型，依次层层向上搜索，直到找到一个名字匹配的属性或到达原型链的末尾。

```js showLineNumbers
const o1 = { a: 1 }
const o2 = { b: 2 }
o1.__proto___ = o2

Object.getPrototypeOf(o1) // o2
o1.b // 2，可以访问原型o2的属性
// o1 ---> o2 ---> Object.prototype ---> null
```

### 构造函数

构造函数用于创建对象。当函数被用作构造函数的时候，其 `prototype` 属性将分配给 **所有** 对象实例的 `__proto__`，作为对象实例的原型。

```js showLineNumbers {11,15}
function func() {
  this.name = "Bob"
}

func.prototype.getName = function () {
  return this.name
}

const o1 = new func()
const o2 = new func()
o1.__proto__ === func.prototype // true
o1.__proto__ === o2.__proto__ // true
// o1,o2 ---> Function.prototype ---> Object.prototype ---> null
o1.instanceOf(func) // true，为构造函数的实例
o1.getName() // 'Bob'，可以访问到原型的属性
```

除了通过 `new` 创建实例，还可以通过字面量的隐式构造函数创建对象实例。如对象 `{ a: 1 }`、数组 `[]`、正则 `/^hello$/` 都使用了隐式构造函数。

```js showLineNumbers
const arr = [1, 2, 3]
Object.getPrototypeOf(arr) === Array.prototype // true
```

构造函数的 `prototype` 默认具有一个 `constructor` 属性，指向构造函数本身，用于记录对象的构造函数。

```js showLineNumbers
// Constructor here represents for any construction function e.g. function hello() {}
Constructor.prototype.constructor === Constructor // true
```

### `Object` 和 `Function` 的鸡和蛋的问题

这个标题来自于 [@creeperyang](https://github.com/creeperyang/blog/issues/9#issuecomment-130759278)，用来描述 `Object` 和 `Function` 谁创造了对方的问题很贴切。

JavaScript 的原型链层级图可以表示如下

![JavaScript Object Layout](/blogcontent/jsobj_full.jpg)

_JavaScript Object Layout from [mollypages.org](http://www.mollypages.org/tutorials/js.mp)_

函数对象的原型指向了 `Function.prototype`，普通对象的原型指向了 `Object.prototype`。根据 ECMA 定义，`Function.prototype` 也是一个标准的对象，以 `Object.prototype` 为原型。

> The initial value of Function.prototype is the standard built-in **Function prototype object** (15.3.4).
>
> [_Standard ECMA-262_](https://262.ecma-international.org/5.1/#sec-15.3.3.1)

所有对象的原型最后都指向了 `Object.prototype`。但是 `Object.prototype` 的原型呢？ECMA 规定，`Object.prototype` 原型为 `null`，它不需要从其他原型中继承属性。

> The value of the [[Prototype]] internal property of the Object prototype object is null, the value of the [[Class]] internal property is "Object", and the initial value of the [[Extensible]] internal property is true.
>
> [_Standard ECMA-262_](https://262.ecma-international.org/5.1/#sec-15.2.4)

```js showLineNumbers {2}
Function.prototype.__proto__ === Object.prototype // true
Object.prototype.__proto__ === null // true
```

如果我们直接使用 `null` 作为原型创建对象，新对象不会继承任何来自 `Object.prototype` 的属性，如 `toString()`。

```js showLineNumbers
const o1 = {} //
const o2 = Object.create(null) // {}
o1.toString() // '[object Object]'
o2.toString() // Uncaught TypeError: o1.toString is not a function
```

“🤔 **悖论**”：`Object` 是构造函数，原型为 `Function.prototype`，`Function.prototype` 的原型又是 `Object.prototype`。`Function` 和 `Object` 互为对方的上层原型。是谁创造了谁呢？

```js showLineNumbers
Function instanceof Object // true
// Function --> Function.prototype ---> Object.prototype
Object instanceof Function // true
// Object --> Function.prototype
```

ECMA 对于 Function prototype 对象的说明

> The Function prototype object is itself a **Function object** (its [[Class]] is "Function") that, when invoked, accepts any arguments and returns undefined.
>
> The value of the [[Prototype]] internal property of the Function prototype object is the standard built-in Object prototype object (15.2.4). The initial value of the [[Extensible]] internal property of the Function prototype object is true.
>
> [_Standard ECMA-262_](https://262.ecma-international.org/5.1/#sec-15.3.4)

1. `Function.prototype` 是一个函数对象，而且可以被调用
2. `Function.prototype` 是一个标准的、 `Object.prototype` 为原型的对象

可以理解为 `Function.prototype` 是一个特殊的函数，它是所有函数的原型。对于 `Object` 而言，本身就是一个构造函数，所以原型指向 `Function.prototype`。

然后就可以解释通了，`Object.prototype` 是原型链的顶端，它创建了 `Function.prototype`，`Function.prototype` 又创建了 `Object`、`Function` 等构造函数。

```js
Object.prototype <--- Function.prototype <--- Object, Function, Array, String...
```

### 改变原型的方法

1. `Object.create()`
   ```js showLineNumbers
   const o1 = { a: 1 }
   const o2 = Object.create(o1)
   // o2 ---> o1 ---> Object.prototype ---> null
   ```
2. （👍 **推荐**）使用 `__proto__` 访问器
   ```js showLineNumbers
   const o1 = { a: 1 }
   const o2 = { b: 2, __proto__: o1 }
   // o2 ---> o1 ---> Object.prototype ---> null
   ```
3. 使用 `Object.setPrototypeOf()` 修改
   ```js showLineNumbers
   const o1 = { a: 1 }
   const o2 = { b: 2 }
   Object.setPrototypeOf(o1, o2)
   // o2 ---> o1 ---> Object.prototype ---> null
   ```

在需要修改原型指向的时候，推荐使用 `__proto__` 直接修改。

> `__proto__` 被所有的现代引擎所支持。与 `Object.prototype.__proto__` setter 相反，对象字面量初始化器中的 `__proto__` 是标准化，被优化的。甚至可以比 `Object.create` 更高效。

### 参考链接

- [继承与原型链 - MDN Web Docs](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
- [对象原型 - MDN Web Docs](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Objects/Object_prototypes)
- [从 \_\_proto\_\_ 和 prototype 来深入理解 JS 对象和原型链](https://github.com/creeperyang/blog/issues/9)
