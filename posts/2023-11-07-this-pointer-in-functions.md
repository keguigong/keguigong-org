---
title: '函数中的this指针到底指向哪儿？'
excerpt: 'JavaScipt是动态作用域，对于函数内部的this指针，其指向也是动态的'
date: '2023-11-07'
author: keguigong
tags: ['tutorial', 'function', 'this']
---

### `this` 的指向问题

`this` 在对象中使用的时候指向十分清晰，但是在函数中使用的话，容易让人感到迷惑。

> 在绝大多数情况下，函数的调用方式决定了 this 的值（运行时绑定）。this 不能在执行期间被赋值，并且在每次函数被调用时 this 的值也可能会不同。ES5 引入了 bind 方法来设置函数的 this 值，而不用考虑函数如何被调用的。ES2015 引入了箭头函数，箭头函数不提供自身的 this 绑定（this 的值将保持为闭合词法上下文的值）。
>
> _[MDN Web Docs](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this)_

根据定义可以提炼几点：

- 函数中 `this` 的值取决于函数的调用方式。即永远指向函数的调用者。
- 函数的 `this` 可以通过 `bind()` 绑定某个具体的对象。
- 箭头函数本身没有 `this`，该函数 `this` 的值取决于闭合词法上下文的值。即永远指向**声明**该函数的作用域的 `this` 指向的对象。

### 有明确调用者，指向调用者

函数的 `this` 与声明函数所在的位置无关，而与调用者有关。通过 `obj.sayHello` 调用则指向 `obj`，如果直接调用则指向 `window`。

```js title="Example 1" showLineNumbers
var name = 'window'
const obj = {
  name: 'obj',
  sayHello: function () {
    console.log(this.name)
  }
}
const sayHello = obj.sayHello

obj.sayHello() // 'obj'
sayHello() // 'window'
```

如果存在多层调用，则始终指向最近的调用者。

```js title="Example 2" showLineNumbers {4}
const obj1 = {
  name: 'obj1',
  obj2: {
    name: 'obj2',
    sayHello: function () {
      console.log(this.name)
    }
  }
}

obj1.obj2.sayHello() // 'obj2'
```

### 箭头函数并不会绑定 `this`

对于 Example 1，我们把 `sayHello` 改造为箭头函数。

```js showLineNumbers {4-6}
var name = 'window'
const obj = {
  name: 'obj',
  sayHello: () => {
    console.log(this.name)
  }
}
const sayHello = obj.sayHello

obj.sayHello() // 'window'
sayHello() // 'window'
```

箭头函数中 `this` 的值取决于**声明**该函数所在的作用域指向的对象。此处，`sayHello` 直接作为对象的一个属性，`obj` 并不是一个作用域，所以作用域为 `window`。

我们将箭头函数放置在一个函数作用域内，则作用域的 `this` 就是箭头函数的 `this`。箭头函数 `say` 在函数作用域 `sayHello` 中，所以 `say` 的指向作用域 `sayHello` 指向的对象 `obj`。

```js showLineNumbers {5-8}
var name = 'window'
const obj = {
  name: 'obj',
  sayHello: function () {
    let say = () => {
      console.log(this.name)
    }
    return say
  }
}

var sayHello = obj.sayHello()
sayHello() // 'obj'
```

可以通过改变作用域 `this` 的指向改变箭头函数的指向。

```js showLineNumbers
var name = 'window'

function foo() {
  this.name = 'function'

  const sayHello = () => {
    console.log(this.name)
  }

  sayHello()
}

foo() // 'window'
new foo() // 'function'
```

直接调用 `foo()` 和 `new foo()` 让函数作用域 `foo` 的 `this` 发生了改变，所以箭头函数的 `this` 也发生了改变。

注意，一定要是**声明**该函数所在的作用域指向的对象，并不是调用的位置。如果 `say` 声明在全局，那么他的作用域就是 `window`，只有作用域的 `this` 才会影响箭头函数的 `this`。

```js showLineNumbers {2-4,8-9}
var name = 'window'
const say = () => {
  console.log(this.name)
}
const obj = {
  name: 'obj',
  sayHello: function () {
    let s = say
    return s
  }
}

var sayHello = obj.sayHello()
sayHello() // 'window'
```

### `setTimeout` 以及箭头函数的应用

针对内置函数 `setTimeout` 等，如果使用普通函数，则调用的时候 `this` 指向的是 `window`。直接使用箭头函数则化解这一问题，因为箭头函数的 `this` 是作用域的 `this`。

```js showLineNumbers {5,10}
var name = 'window'
const obj = {
  name: 'obj',
  sayHello1: function () {
    setTimeout(function () {
      console.log(this.name)
    })
  },
  sayHello2: function () {
    setTimeout(() => {
      console.log(this.name)
    })
  }
}

obj.sayHello1() // 'window'
obj.sayHello2() // 'obj'
```

### 显式指定 `this` 的指向

通过 `apply`、`call`、`bind`可以改变函数 `this` 的指向。对于箭头函数，不可绑定 `this`。

```js showLineNumbers
const obj1 = { name: 'obj1' }
const obj2 = { name: 'obj2' }
function foo() {
  console.log(this.name)
}

foo.apply(obj1) // 'obj1'
foo.apply(obj2) // 'obj2'
```

### DOM 的事件回调函数

当函数被用作事件处理函数时，它的 `this` 指向触发事件的元素。

```js showLineNumbers
function handleClick(e) {
  console.log(this === e.currentTarget) // true
  console.log(this === e.target) // true when target is currentTarget
}

const element = document.getElementById('#target')
element.addEventListener('click', handleClick)
```

### 严格模式下的 `this`

在非严格模式（[Sloopy Mode](https://developer.mozilla.org/zh-CN/docs/Glossary/Sloppy_mode)）下，如果函数没有明确指定 `this` 的指向，它将指向全局对象（浏览器中为 `window`，node 环境中为 `globalThis`）。而在严格模式（[Strict Mode](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode)）下，如果函数没有明确指定 `this` 的指向，它将保持为 `undefined`。

```js showLineNumbers {1,7}
'use strict'
function foo() {
  console.log(this) // undefined
}
// Or inside function scope
function bar() {
  'use strict'
  console.log(this) // undefined
}
```

### 练习

```js title="Prolem 1" showLineNumbers {-1}
class Foo {
  func1 = function () {
    return this
  }
  func2 = () => {
    return this
  }
}

const foo = new Foo()
const { func1, func2 } = foo
console.log(func1(), func2()) // undefined Foo { func1: [Function: func1], func2: [Function: func2] }
```

```js title="Problem 2" showLineNumbers
var name = 'window'
function func() {
  console.log(this.name)
}

const obj = {
  name: 'obj',
  method: function (fn) {
    fn()
    arguments[0]()
  }
}

obj.method(func, 1) // 'window' undefined(this ---> arguments)
```

### 参考链接

- [JS 中的 this 到底指向啥？看完这篇就知道了！](https://ost.51cto.com/posts/2536)
- [this 指向及改变它的指向的方法](https://my729.github.io/blog/accumulate/JavaScript/this%E6%8C%87%E5%90%91.html#this%E6%8C%87%E5%90%91%E8%AF%A6%E8%A7%A3)
- [JavaScript 严格模式和 this 指向](https://blog.51cto.com/u_16213333/7015943)
- [ES6 箭头函数的 this 指向详解](https://www.zhihu.com/tardis/zm/art/57204184?source_id=1003)
