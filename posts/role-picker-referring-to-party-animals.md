---
title: "A Draggable Role Picker Demo Referring to Party Animals"
date: "2023-02-12"
---

Party Animals is a physical based party game, and I found that its official website looks great, then I decided to learn something from it.

What I decided to do is to realize a demonstration web page referring to the "motion_effect_demo.mp4" below, and make sure the demo satifying

- The visual perception should be consistent with the video, including all animation details such as scaling, easing, and rebound.
- Pay attention to observe the video, do not miss the interaction details.
- Use mouse to drag the list and hide the scrollbar.
- Press left or right arrow key to change selection, and make selected role centered if possible.
- Use materials from [Party Animals official website](https://partyanimals.com/).

Watch [motion_effect_demo.mp4](https://user-images.githubusercontent.com/29125211/217710234-7f6ef0e2-a3e2-4c64-b804-86159deceffc.mp4) and see my final live demo [here](/eg/role-picker).

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

## Handle Dragging

Add event listeners to hanlde mouse moving, we can use `onmousedown`, `onmousemove` and `onmouseup` to catch the moving.

```tsx
<div
  onMouseDown={handleMoveStart}
  onMouseMove={handleMove}
  onMouseUp={handleMoveEnd}
  onMouseOut={handleMoveEnd}
>
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
<ul ... style={{ transform: `translateX(-${divLeft}px)` }}>...</ul>
```

Please keep your role list in the safe area with some border conditions. Calculate the container's width and role list's width.

```ts
// 0 < divLeft < innerWidth - conWidth
const [divLeft, setDivLeft] = useState(0)
const [innerWidth, setInnerWidth] = useState(0)
const [conWidth, setConWidth] = useState(0)

const containerEl = useRef<HTMLDivElement>(null)
const innerEl = useRef<HTMLUListElement>(null)

function moveX(deltaX: number) {
  let newValue =
    divLeft - deltaX > 0
      ? divLeft - deltaX < innerWidth - conWidth
        ? divLeft - deltaX
        : innerWidth - conWidth
      : 0
  setDivLeft(newValue)
}

useEffect(() => {
  if (!containerEl.current || !innerEl.current) return
  setInnerWidth(innerEl.current.scrollWidth)
  setConWidth(containerEl.current.offsetWidth)
}, [])
```

Besides, we can add touch support to make it work properly on mobile devices.

```ts
const [startX, setStartX] = useState(0)

function handleTouchStart(e: TouchEvent) {
  setStartX(e.touches[0].clientX)
}

function handleTouchMove(e: TouchEvent) {
  let x = e.touches[0].clientX
  let deltaX = x - startX
  moveX(deltaX)
  setStartX(x)
}

function handleTouchEnd() {
  setStartX(0)
}
```

Then add a pick function by using `onClick` callback and `isActive` prop, and we get a component that can be dragged and picked.

## TODO: Handle Keyboard Input

Next, we need to handle left arrow and right arrow key input, and make picked role placed in the center of the view.

## Conclusion and Next Steps

In this article, we learned how to build a draggable role picker in React from scratch. As you saw here, this doesn't require a lot of code, and there are lots of thing can be done better, such as css animations, moving curves, etc. and we can update our code later.

View and download the code [here](https://github.com/keguigong/next-blog/tree/blog/components/role-picker).