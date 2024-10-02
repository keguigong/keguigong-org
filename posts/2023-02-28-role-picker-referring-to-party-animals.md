---
title: "开发一个游戏角色选择器，参考Party Animals风格"
date: "2023-02-28"
hero: "/blogcontent/party-animals-logo.png"
excerpt: "Party Animals虽然是一款体量较小的游戏，但是不管是游戏美术还是网站设计来说，还是可以看出来是比较追求细节的。"
author: keguigong
---

[Party Animals](https://partyanimals.com/) 是一个基于物理引擎的多人派对游戏，我在看到它的官网的时候发现一些还不错的实现方式，于是决定参照其中的角色选择功能，实现一个类似的效果。

效果如视频 [Motion Effect Demo.mp4](https://user-images.githubusercontent.com/29125211/217710234-7f6ef0e2-a3e2-4c64-b804-86159deceffc.mp4) 所示，需要满足：

- 视觉效果应该和视频中展现的一致，包括缩放、缓入缓出以及回弹等动画细节
- 交互细节也应该和视频中一致，包括鼠标悬浮、点击、选中以及按压等效果
- 可以使用鼠标左右拖动列表，并且不借助于滚动条
- 可以使用左右按键操作选中的角色，并且将选中的角色居中

所有素材资源均可在官网上获取。

查看 [在线演示](https://keguigong.github.io/role-picker-referring-to-party-animals/)。

![Role Picker](/blogcontent/party-animals-picker-progressive.jpg)

我们参考 React 官方指导手册 [Thinking in React](https://reactjs.org/docs/thinking-in-react.html) 来进行开发。

## 构建静态的组件

参考视频中的样子，我们可以搭建起静态的框架。定义一个 `RolePicker` 组件，里面包含了一个由 `RoleAvatar` 组成的列表。

```tsx title="RolePicker.tsx" showLineNumbers
export default function RolePicker() {
  return (
    <div className={styles["roles-container"]}>
      <ul className={styles["source-item-wrap"]}>
        {rolesList.map((role, index) => (
          <RoleAvatar key={index} name={role} isActive={index === 0} />
        ))}
      </ul>
    </div>
  )
}
```

`RoleAvatar` 组件有名为 `isActive` 的 props，会影响组件的样式，同时该组件也有自己的样式，针对需要应用多个样式的情况，可以使用 `classNames` 库来合并多个 `className`。

```tsx title="RoleAvatar.tsx" showLineNumbers /isActive/#v /onClick/
export default function RoleAvatar({ name, onClick, isActive }) {
  return (
    <li onClick={onClick} className={classNames(styles["source-item"], isActive && styles["active"])}>
      <div className={styles["avatar-wrap"]}>
        <img className={styles["avatar-bg"]} src="/articlecontent/party-animals/characters_avatar_hover.png" />
        <img
          className={styles["avatar-source"]}
          src={`/articlecontent/party-animals/characters_${name}_avatar.png`}
          alt={name}
        />
      </div>
    </li>
  )
}
```

观察视频可以发现，`RoleAvatar` 组件被 `hover` 的时候，存在一个两段的动画

- 鼠标一进入，背景快速的变大
- 鼠标长时间悬浮，背景呈现呼吸效果

我们可以使用 `animation` 来实现这样的效果，它本身也支持将值设置为多个动画，并逐个执行。因为悬浮效果为变大，所以我们通过 `@keyframes` 定义了一个变大的效果，然后两段动画其实结果一样，只是变化的过程不一样，变化过程我们使用贝塞尔曲线来加以区别。最终的效果如下：

```scss title="RoleAvatar.module.scss"
.avatar-bg {
  ...
  animation: pop 1s cubic-bezier(0.02, 1.2, 1, 1), pop 1s cubic-bezier(0, 0, 0.36, 1.14) infinite alternate;
}

@keyframes pop {
  100% {
    transform: scale(1.1);
  }
}
```

经过以上的步骤，我们基本完成了静态组件的开发，接下来我们来处理一些用户的输入。

## 实现拖动效果

若要实现鼠标拖动的效果，我们可以搭配使用 `onmousedown`，`onmousemove` 以及 `onmouseup` 三个事件来实现。

```tsx title="RolePicker.tsx" showLineNumbers {5-7,10-12}
useEffect(() => {
  const mousedown = () => setFlag(true)
  const mouseup = () => setFlag(false)
  const block = domRef.current
  block?.addEventListener("mousedown", mousedown)
  window.addEventListener("mousemove", slideCallback)
  window.addEventListener("mouseup", mouseup)

  return () => {
    block?.removeEventListener("mousedown", mousedown)
    window.removeEventListener("mousemove", slideCallback)
    window.removeEventListener("mouseup", mouseup)
  }
}, [domRef, slideCallback])
```

使用标志 `dragFlag` 来判断当前是否在按住并拖动鼠标，只有按下的时候鼠标移动才被认为是在拖动。同时在鼠标抬起之后需要将标志清除掉。

```tsx showLineNumbers
const [dragFlag, setDragFlag] = useState(false)

function handleMoveStart() {
  setDragFlag(true)
}

function handleMove(e: MouseEvent) {
  if (innerWidth - conWidth <= 0) return
  if (dragFlag) {
    moveX(e.movementX)
  }
}

function handleMoveEnd() {
  setDragFlag(false)
}
```

这样就能在按下并拖动鼠标的时候获取到鼠标的移动量，transfrom 的 `translateX()` 属性可以移动元素，我们可以通过将鼠标移动量赋值给 `translateX()` 来实现拖动效果。

```tsx
<ul ... style={{ transform: `translateX(${left}px)` }}>...</ul>
```

同时需要注意一些边界条件，不能将列表拖到容器外。计算容器的宽度以及列表的实际宽度（即滚动宽度 `scrollWidth`），左右两侧需要分别计算。

```tsx showLineNumbers
const slideCallback = useCallback(
  (e: MouseEvent | TouchEvent) => {
    if (domRef.current && conRef.current && moveFlag) {
      const deltaX = e instanceof TouchEvent ? e.touches[0].clientX - startX : e.movementX
      e instanceof TouchEvent && setStartX(e.touches[0].clientX)

      const conWidth = conRef.current.clientWidth
      const width = domRef.current.scrollWidth
      const newLeft = left + deltaX <= 0 ? (left + deltaX >= conWidth - width ? left + deltaX : conWidth - width) : 0
      domRef.current.style.transform = `translateX(${newLeft}px)`
      setLeft(newLeft)
    }
  },
  [domRef, conRef, moveFlag, left, startX],
)
```

现在我们已经可以正常使用鼠标拖动我们的列表了，但是别忘了添加移动端的支持，我们将触摸滑动的事件对应的也进行一下处理，事件类型有些许区别，在获取指针位置的时候需要注意一下。

```tsx showLineNumbers
const [startX, setStartX] = useState(0)

useEffect(() => {
  const touchstart = (e: TouchEvent) => (setFlag(true), setStartX(e.touches[0].clientX))
  const touchend = (e: TouchEvent) => setFlag(true)
  block?.addEventListener("touchstart", touchstart)
  window.addEventListener("touchmove", slideCallback)
  window.addEventListener("touchend", touchend)

  return () => {
    block?.removeEventListener("touchstart", touchstart)
    window.removeEventListener("touchmove", slideCallback)
    window.removeEventListener("touchend", touchend)
  }
}, [domRef, slideCallback])
```

最后再添加一个 `onClick` 事件用来处理角色选中。

## 使用左右方向按键控制选中角色

这一步我们需要添加方向按键的支持，可以通过左右方向按键切换选中的角色，并将角色自动居中。我们首先监听一下键盘事件，按左方向键选中上一个角色，按右方向键选中下一个角色。

```tsx showLineNumbers
const keyCallback = useCallback((e: KeyboardEvent) => {
  const len = rolesList.length * 2
  if (e.code === "ArrowLeft") setActive((prev) => (prev - 1 >= 0 ? prev - 1 : 0)), setArrowLeft(1)
  else if (e.code === "ArrowRight") setActive((prev) => (prev + 1 <= len - 1 ? prev + 1 : len - 1)), setArrowLeft(-1)
  else return
}, [])

useEffect(() => {
  window.addEventListener("keydown", keyCallback)
  return () => {
    window.removeEventListener("keydown", keyCallback)
  }
}, [keyCallback])
```

之前使用鼠标拖动，我们只需要将拖动量转换为位移就可以了，并不需要进行太多的计算，而如果要实现居中的效果，我们需要进行一些计算。

分别计算以当前选中角色的中心为切分点的左边的宽度 `leftWidth` 以及右边的宽度 `rightWidth`， 并将这个结果与容器的一半宽度 `halfConWidth` 做比较，如果 `leftWidth > halfConWidth` 则将位移量设置为差值，反之则不移动，因为已经到了列表的边界了。右侧 `rightWidth` 同理进行计算。

```tsx showLineNumbers
useEffect(() => {
  if (!domRef.current || !conRef.current) return
  const len = rolesList.length * 2

  const conWidth = conRef.current.clientWidth
  const width = domRef.current.scrollWidth

  // 1rem = 16px, the first and last li has a outer padding of 3rem
  // The activeLi is 1rem wider than common li
  const liWidth = (width - 3 * 16 - 16) / len
  const liActiveWidth = liWidth + 16

  const halfConWidth = conWidth / 2
  const leftWidth = liWidth * activeIndex + liActiveWidth / 2 + 3 * 16
  const rightWidth = liWidth * (len - 1 - activeIndex) + liActiveWidth / 2 + 3 * 16

  if (leftWidth >= halfConWidth && rightWidth >= halfConWidth) {
    setLeft(halfConWidth - leftWidth)
  } else if (leftWidth < halfConWidth) setLeft(0)
  else if (rightWidth < halfConWidth) setLeft(conWidth - width)
}, [domRef, conRef, activeIndex, arrowLeft])
```

同样的，通过 `translateX()` 让列表动起来。

```ts
useEffect(() => {
  if (domRef.current) domRef.current.style.transform = `translateX(${left}px)`
}, [domRef, left])
```

现在我们可以使用左右方向按键切换选中的角色了。还有一个小细节，使用该方法进行居中的时候有一个缓入缓出的效果，即需要给 `translateX()` 添加一个 `ease-in-out` 的的过渡效果，但是需要注意的是拖动的时候不能有这个属性，不然拖不动，需要搭配拖动标志 `dragFlag` 来动态添加 `ease-in-out`。

## 在两侧添加箭头按钮

键盘操作比较隐蔽，我们直接在列表的两侧添加两个箭头，实现与左右方向按键同样的功能。

```tsx
<div>
  ...
  <div className={styles["left-arrow"]} onClick={() => keyCallback({ code: "ArrowLeft" } as KeyboardEvent)}>
    <div className={styles["arrow-icon-left"]}></div>
  </div>
  <div className={styles["right-arrow"]} onClick={() => keyCallback({ code: "ArrowRight" } as KeyboardEvent)}>
    <div className={styles["arrow-icon-right"]}></div>
  </div>
  ...
</div>
```

现在可以直接在屏幕上点击也可以切换选中的角色并将其居中显示。

## 鼠标点击事件与拖动同时触发

使用中我们发现，我们使用鼠标进行拖动的时候，拖动结束鼠标松开，会触发 `RoleAvatar` 的 `onClick` 事件，导致那个角色被选中，但是我们并不想在拖动结束后选中某一个角色，所以在拖动的时候我们需要让 `onClick` 事件失效，可以通过一个简单的计时来判断，计算鼠标按下到松开的时间，如果超过 100ms，则认为不是点击事件。

```tsx
const [startTime, setTime] = useState(Date.now());

useEffect(() => {
  const mousedown = () => (setFlag(true), setTime(Date.now()));
  ...
}, [...])
```

在 `onClick` 事件触发的时候，计算一下时长。

```tsx
const toggle = (index: number) => {
  if (Date.now() - startTime >= 100) return
  setActive(index)
}

...
<>
  ...
  <RoleAvatar
    ...
    isActive={index === activeIndex}
    onClick={() => toggle(index)}
  />
</>
```

通过以上的步骤，我们就完成了一个还算看得过去的角色选择器，当然也还有很多可以优化的空间，比如 css 动画不够细致、角色选中以及未被选中两个状态切换的时候缺少回弹效果等，后面有机会可以再优化优化。
