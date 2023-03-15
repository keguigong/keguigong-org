---
title: "虚拟DOM和真实DOM的相互转换"
date: "2023-03-15"
---

> React 以及 Vue 都采用了虚拟 DOM（VNode）的形式进行 diff 比较，避免了频繁操作真实 DOM 元素带来的性能开销，通过 VNode 以及 DOM 之间的相互转换，可以高效的将对 VNode 更改同步给浏览器，并最终呈现给用户。

定义好 VNode 类型

```js
class VNode {
  constructor(tag, data, value, type) {
    this.tag = tag.toLowerCase()
    this.data = data
    this.value = value
    this.type = type
    this.children = []
  }

  appendChild(vNode) {
    this.children.push(vNode)
  }
}
```

## 虚拟 DOM 转换为真实 DOM

```js
function getRealNode(vnode) {
  // 创建节点
  const { tag, data, value, type, children } = vnode
  let _node = null
  // 判断当前节点是文本节点还是标签节点
  if (type === 1) {
    _node = document.createElement(tag) //创建节点
    for (let key in data) {
      // 设置节点属性
      _node.setAttribute(key, data[key])
    }
    // 追加子节点
    for (let i = 0; i < children.length; i++) {
      // 设置节点属性
      _node.appendChild(getRealNode(children[i]))
    }
  } else if (type === 3) {
    _node = document.createTextNode(value)
  }
  return _node
}
```

## 真实 DOM 转换为虚拟 DOM

```js
// 遍历节点生成虚拟Dom
function createVnode(node) {
  const nodeType = node.nodeType
  let _vnode = null
  if (nodeType === 1) {
    const tagName = node.nodeName //获取标签类型
    const attrList = node.attributes //获取标签所有的标签属性
    const attrData = {} //存放标签属性
    for (let i = 0; i < attrList.length; i++) {
      attrData[attrList[i].nodeName] = attrList[i].nodeValue
    }
    _vnode = new Vnode(tagName, attrData, undefined, nodeType) // tag,data,value,type
    // 处理子元素
    const childNodes = node.childNodes
    for (let i = 0; i < childNodes.length; i++) {
      _vnode.appendChild(createVnode(childNodes[i]))
    }
  } else if (nodeType === 3) {
    // 文本节点
    _vnode = new Vnode(undefined, undefined, node.nodeValue, nodeType)
  }
  return _vnode
}
```
