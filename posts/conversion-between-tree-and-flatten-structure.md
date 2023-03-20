---
title: "树形结构Tree和扁平结构的转换"
date: "2023-03-20"
coverImage: "blogcontent/flatten-tree.svg"
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
function treeToArray(tree) {
  let res = []
  for (const item of tree) {
    const { children, ...rest } = item
    if (children && children.length) {
      res = res.concat(treeToArray(children))
    }
    res.push(rest)
  }
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

比较常用的就是递归实现，思路也比较简单，实现一个方法，该方法传入 tree 父节点和父 id，循环遍历数组，找到对应的子节点，push 到父节点中，再递归查找子节点的子节点。

```js
function arrayToTree(items) {
  let res = []
  let getChildren = (res, pid) => {
      for (const i of items) {
          if (i.pid === pid) {
              const newItem = { ...i, children: [] }
              res.push(newItem)
              getChildren(newItem.children, newItem.id)
          }
      }
  }
  getChildren(res, 0)
  returen res
}
```

该算法的时间复杂度为 `O(2^n)`。性能消耗很大。

References:

- [Js 实现扁平化数据结构和 tree 转换](https://juejin.cn/post/6987224048564437029)
