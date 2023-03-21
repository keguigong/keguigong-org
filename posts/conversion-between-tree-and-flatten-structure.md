---
title: "树形结构Tree和扁平结构的转换"
date: "2023-03-20"
coverImage: "/blogcontent/flatten-tree.svg"
---

在开发中经常会遇到树形结构和扁平数据的转换，比如树形权限结构拍平为数组用来便捷的查找权限等。

**1. 扁平数据结构**

扁平数据结构一般为数组，`children` 数组包含元素的直接子元素。

```js
const arr = [
  { pid: null, id: 1, children: [2, 3] },
  { pid: 1, id: 2, children: [] },
  { pid: 1, id: 3, children: [4, 5] },
  ...
]
```

**2. 树形结构 Tree**

```js
const tree = {
  pid: null,
  id: 1,
  children: [
    {
      pid: 1,
      id: 2,
      children: []
    },
    {
      pid: 1,
      id: 3,
      children: [
        {
          pid: 3,
          id: 4,
          children: []
        },
        {
          pid: 3,
          id: 5,
          children: []
        }
      ]
    }
  ]
}
```

## Tree 转换为扁平结构

通过判断数节点是否有子元素，若有，则重复判断过程，是深度优先的遍历方法。可以使用递归或者 `reduce` 实现，但是思路是一致的。

**1. 递归实现**

```js
const tree2Arr = (tree) => {
  const res = []
  const _tree2Arr = (tree) => {
    const { children, ...rest } = tree
    const newItem = {
      ...rest,
      children: []
    }
    for (let i = 0; i < children.length; i++) {
      newItem.children.push(children[i].id)
      _tree2Arr(children[i])
    }
    res.push(newItem)
  }
  _tree2Arr(tree)
  return res
}
```

**1. `reduce` 实现**

```js
function treeToArray(tree) {
  return tree.reduce((res, item) => {
    const { children, ...rest } = item
    return res.concat(rest, children && children.length ? treeToArray(children) : [])
  }, [])
}
```

## 扁平结构转换为 Tree

使用递归，传入 tree 父节点和父 id，循环遍历数组，通过 pid 寻找子节点，push 到父节点的 `children` 中，依次对父节点的 `children` 重复上述操作。

```js
function arr2Tree(arr) {
  let res = []
  let getChildren = (res, pid) => {
    for (const item of arr) {
      if (item.pid === pid) {
        const newItem = { ...item, children: [] }
        res.push(newItem)
        getChildren(newItem.children, newItem.id)
      }
    }
  }
  getChildren(res, 0)
  return res
}
```

References:

- [JS 数组扁平化的一些方法(7-8 种)](https://juejin.cn/post/6844903805876699150)
