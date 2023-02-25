---
title: "参考Party Animals制作游戏角色选择组件"
date: "2023-02-12"
---

> - View and download the code [here](https://github.com/keguigong/role-picker-referring-to-party-animals).
> - See my final live demo [here](https://keguigong.github.io/role-picker-referring-to-party-animals).

Party Animals is a physical based party game, and I found that its official website looks great, then I decided to learn something from it.

What I decided to do is to realize a demonstration web page referring to the "motion_effect_demo.mp4" below, and make sure the demo satifying

- The visual perception should be consistent with the video, including all animation details such as scaling, easing, and rebound.
- Pay attention to observe the video, do not miss the interaction details.
- Use mouse to drag the list and hide the scrollbar.
- Press left or right arrow key to change selection, and make selected role centered if possible.
- Use materials from [Party Animals official website](https://partyanimals.com/).

Watch [motion_effect_demo.mp4](https://user-images.githubusercontent.com/29125211/217710234-7f6ef0e2-a3e2-4c64-b804-86159deceffc.mp4).

Let's refer to [Thinking in React](https://reactjs.org/docs/thinking-in-react.html) and start our
work.

## Build Static Component in React

Referring to the video, we can build the static react components, and it should be like this

```tsx
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

The `RoleAvatar` has an `isActive` prop affecting how it looks, we can use `classNames` to merge two or more classNames.

```tsx
export default function RoleAvatar({ name, onClick, isActive }) {
  return (
    <li
      onClick={onClick}
      className={classNames(styles["source-item"], isActive && styles["active"])}
    >
      <div className={styles["avatar-wrap"]}>
        <img
          className={styles["avatar-bg"]}
          src="/articlecontent/party-animals/characters_avatar_hover.png"
        />
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

Thene we'll get the static component. Be careful that when `RoleAvatar` gets hovered, it has a two-stage pop animation, which can be described as

```scss
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

## Handle Drag Events

Add event listeners to hanlde mouse moving, we can use `onmousedown`, `onmousemove` and `onmouseup` to catch the moving.

```tsx
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

Use flag `dragFlag` to decide the start and end of drag.

```ts
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

Make role list move left or right with `translateX()`.

```tsx
<ul ... style={{ transform: `translateX(${left}px)` }}>...</ul>
```

Please keep your role list in the safe area with some border conditions. Calculate the container's width and role list's width.

```ts
const slideCallback = useCallback(
  (e: MouseEvent | TouchEvent) => {
    if (domRef.current && conRef.current && moveFlag) {
      const deltaX = e instanceof TouchEvent ? e.touches[0].clientX - startX : e.movementX
      e instanceof TouchEvent && setStartX(e.touches[0].clientX)

      const conWidth = conRef.current.clientWidth
      const width = domRef.current.scrollWidth
      const newLeft =
        left + deltaX <= 0
          ? left + deltaX >= conWidth - width
            ? left + deltaX
            : conWidth - width
          : 0
      domRef.current.style.transform = `translateX(${newLeft}px)`
      setLeft(newLeft)
    }
  },
  [domRef, conRef, moveFlag, left, startX]
)
```

Besides, we can add touch support to make it work properly on mobile devices.

```ts
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

Then add a pick function by using `onClick` callback and `isActive` prop, and we get a component that can be dragged and picked.

## Handle Keyboard Events

Next, we need to handle left arrow and right arrow key input, and make picked role placed in the center of the view. Add keyboard event listener.

```ts
const keyCallback = useCallback((e: KeyboardEvent) => {
  const len = rolesList.length * 2
  if (e.code === "ArrowLeft") setActive((prev) => (prev - 1 >= 0 ? prev - 1 : 0)), setArrowLeft(1)
  else if (e.code === "ArrowRight")
    setActive((prev) => (prev + 1 <= len - 1 ? prev + 1 : len - 1)), setArrowLeft(-1)
  else return
}, [])

useEffect(() => {
  window.addEventListener("keydown", keyCallback)
  return () => {
    window.removeEventListener("keydown", keyCallback)
  }
}, [keyCallback])
```

Then calculate `leftWidth` and `rightWidth`, compare both value with `halfConWidth`.

```ts
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

And finally, change our view when `left` changes.

```ts
useEffect(() => {
  if (domRef.current) domRef.current.style.transform = `translateX(${left}px)`
}, [domRef, left])
```

Now you can use you left arrow key and right arrow key on your keyboard to control the component.

## Add Arrow Icon on Both Sides

One more step, we can add two arrow icons on both sides of the list to do the same thing like keyboard does.

```tsx
<div>
  ...
  <div
    className={styles["left-arrow"]}
    onClick={() => keyCallback({ code: "ArrowLeft" } as KeyboardEvent)}
  >
    <div className={styles["arrow-icon-left"]}></div>
  </div>
  <div
    className={styles["right-arrow"]}
    onClick={() => keyCallback({ code: "ArrowRight" } as KeyboardEvent)}
  >
    <div className={styles["arrow-icon-right"]}></div>
  </div>
  ...
</div>
```

Then you can click the icons to control the component.

## Conclusion and Next Steps

In this article, we learned how to build a draggable role picker in React from scratch. As you saw here, this doesn't require a lot of code, and there are lots of thing can be done better, such as css animations, moving curves, etc. and we can update our code later.
