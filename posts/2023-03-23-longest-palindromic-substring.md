---
title: "回忆最长回文子串以及动态规划的几种思路"
date: "2023-03-23"
hero: "/blogcontent/leetcode-logo.svg"
author: keguigong
---

最长回文子串（[5. 最长回文子串](https://leetcode.cn/problems/longest-palindromic-substring/)）的问题在面试中经常会被提及，能够考察基础的算法以及代码实现的能力。如果看过相关解析的同学能很方便的写出几种不同的方法，而使用暴力求解的方式则很难有比较好的性能表现。我根据自己的理解以及回忆，对这个问题再求解一次，其中使用动态规划的方式也能进行求解，对动态规划再进行一些延伸，也希望能加深对于动态规划的理解。

## 题目描述

首先重新阅读一下题目，题目如下。

给你一个字符串 `s`，找到 `s` 中最长的回文子串。

如果字符串的反序与原始字符串相同，则该字符串称为回文字符串。

示例 1：

```js
输入：s = "babad"
输出："bab"
解释："aba" 同样是符合题意的答案。
```

示例 2：

```js
输入：s = "cbbd"
输出："bb"
```

提示：

- `1 <= s.length <= 1000`
- `s` 仅由数字和英文字母组成

根据题目我们可以得出，回文字符串就是“上海自来水来自海上”这样的呈中心对称的字符串，且中间的文字可以相同，如示例 2 所示，所以我们很容易的想到中心扩散法，但是一开始我其实是使用的暴力求解法。

## 暴力解法：遍历截取子串，判断是否为回文子串

通过遍历字符串，从位置 `i` 依次截取长度从 `1` 到 `len - i` 的子串，判断子串是否回文子串以及是否为最长的子串，直到遍历完成。判断方法也比较粗暴，直接讲字符串反回来判断是否相等即可，通过转换为数组，再使用数组的 `reverse` 方法实现。

```ts
function longestPalindrome(s: string) {
  let maxLen = 0
  let ans = ""
  for (let i = 0; i < s.length; i++) {
    // 长度从1开始变化，直到s的末尾
    for (let len = 1; i + len <= s.length; len++) {
      let str = s.slice(i, i + length)
      // 反转字符串，回文串中心对称，反转相等
      let reversed = Array.from(str).reverse().join("")
      if (str === reversed) {
        if (len > maxLen) {
          maxLen = len
          ans = str
        }
      }
    }
  }
  return ans
}
```

时间复杂度为 `O(n^2)`，复杂度较高，且使用 `reverse` 方法转换，本身涉及到系统函数的一些复杂计算，不太推荐。

## 中心扩散法

中心扩散法主要受到示例 2 的启发，如果中间是两个相同的元素则可以直接进行扩散，判断第 `i` 个和第 `i - 1 / i + 1` 个元素是否一致，如果一致则继续比较下一位是否相同，如果不一致之后开始两侧回文子串的比较，因为是从中间向两侧扩散，所以我们采用两个指针 `start` 和 `end` 来表示两侧选中的元素。比较第 `start` 个元素和第 `end` 个元素是否相同，如果相同则区间内为回文子串，如果不同，则将扩散中心移动至下一个元素 `i`，重复上述操作，直至遍历完成，返回最长的回文子串，子串长度为 `end - start + 1`。

总结一下我们的查找方式：

- 往左寻找与 `s[i]` 相同的字符，直到遇到不相等为止
- 往右寻找与 `s[i]` 相同的字符，直到遇到不相等为止
- 左右双向扩散，直到左和右不相等为止

这样的好处是对 `s` 只进行了一次完整的遍历，且不用单独判断回文子串的合法性，通过上述方式框选的子串肯定是回文子串。

```ts
function longestPalindrome(s: string): string {
  let str = ""
  for (let i = 0, start = 0, end = 0; i < s.length; i++) {
    start = i
    end = i
    while (start - 1 >= 0 && s[start - 1] === s[i]) {
      start--
    }
    while (end + 1 < s.length && s[end + 1] === s[i]) {
      end++
    }
    while (start - 1 >= 0 && end + 1 < s.length && s[end + 1] === s[start - 1]) {
      start--
      end++
    }
    if (end > start && str.length < end - start + 1) {
      str = s.slice(start, end + 1)
    }
  }

  return str ? str : s[0]
}
```

时间复杂度同样为 `O(n^2)`，但是第二轮遍历其实很少会走到 `n`，而且不涉及到对回文子串的合法性校验，所以相较于暴力解法有很大的优势。

## 动态规划法

动态规划的思想为将当前的状态转移到它之前的状态上去，对于回文串来说也可以实现转移。对于一个子串而言，如果它是回文串，并且长度大于 2，那么将它首尾的两个字母去除之后，它仍然是个回文串。根据这样的思路，我们就可以用动态规划的方法解决本问题。我们使用 `P(i,j)` 表示子串的起始和结束位置，表示为状态转移方程则是

```bash
P(i,j) = P(i + 1,j − 1) && (Si == Sj)
```

还需要考虑动态规划中的边界条件，即子串的长度为 1 或 2。对于长度为 1 的子串，它显然是个回文串；对于长度为 2 的子串，只要它的两个字母相同，它就是一个回文串。根据以上条件可以完成动态规划了。

```ts
function longestPalindrome(s: string): string {
  if (s === null || s.length < 2) return s

  const len = s.length
  let maxStart = 0
  let maxEnd = 0
  let maxLen = 0

  const dp: boolean[][] = Array.from(Array(len), () => Array(len).fill(false))

  for (let r = 1; r < len; r++) {
    // l = left r = right
    for (let l = 0; l < r; l++) {
      if (s[l] == s[r] && (r - l <= 2 || dp[l + 1][r - 1])) {
        dp[l][r] = true
        if (r - l + 1 > maxLen) {
          maxLen = r - l + 1
          maxStart = l
          maxEnd = r
        }
      }
    }
  }

  return s.slice(maxStart, maxEnd + 1)
}
```

时间复杂度同样为 `O(n^2)`。

还有一个复杂度为 `O(n)` 的 **Manacher** 算法，但是个算法还没有看懂。。。有机会再学习一下。

## 动态规划扩展

动态规划是一种比较将复杂问题分解为简单的子问题的方法，这样理解会比较抽象，我摘取一段力扣上的介绍：

> 使用动态规划解决的问题有个明显的特点，一旦一个子问题的求解得到结果，以后的计算过程就不会修改它，这样的特点叫做无后效性，求解问题的过程形成了一张有向无环图。动态规划只解决每个子问题一次，具有天然剪枝的功能，从而减少计算量。

有很多相应的题目可以帮助我们更加深入的理解动态规划：

- [509. 斐波那契数](https://leetcode.cn/problems/fibonacci-number/)
- [198. 打家劫舍](https://leetcode.cn/problems/house-robber/)
- [213. 打家劫舍 II](https://leetcode.cn/problems/house-robber-ii/)
- [22. 括号生成](https://leetcode.cn/problems/generate-parentheses/)
- [45. 跳跃游戏 II](https://leetcode.cn/problems/jump-game-ii/)

也还有很多 hard 的题目，如大名鼎鼎的接雨水，可以一个一个去攻克。
