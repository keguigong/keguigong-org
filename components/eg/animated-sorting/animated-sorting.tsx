import { use, useCallback, useEffect, useMemo, useRef, useState } from "react"
import styles from "./animated-sorting.module.scss"
import {
  bubbleSort,
  insertionSort,
  selectionSort,
  genRandomNums,
  genFrameArr,
  quickSort
} from "./util-sorting"
import { CanvasDraw } from "./util-canvas-draw"
import SlideBlock from "./slide-block"

export default function AnimatedSorting() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [canvasCtx, setCtx] = useState<CanvasRenderingContext2D>()
  const [rect, setRect] = useState({ width: 0, height: 0 })

  const nums = useMemo(() => genRandomNums(), [])
  const sortMethodMap = useMemo<{ [key: string]: any }>(
    () => ({
      "Bubble Sort": bubbleSort,
      "Insertion Sort": insertionSort,
      "Selection Sort": selectionSort,
      "Quick Sort": quickSort
    }),
    []
  )

  const [sortMethod, setSortMethod] = useState("Bubble Sort")
  const [interTime, setInterTime] = useState(0)
  const [frameIndex, setIndex] = useState(0)
  // Re-generate frame array when sorted method changes
  const frameArr = useMemo(() => {
    setIndex(0) // Remember to restart from beginning
    return genFrameArr(nums.slice(), sortMethodMap[sortMethod])
  }, [nums, sortMethodMap, sortMethod])

  // UseMemo to store draw methods
  const canvasDraw = useMemo(() => {
    if (canvasCtx && rect.width && rect.height) {
      const canvasDraw = new CanvasDraw(canvasCtx, rect.width, rect.height)
      return canvasDraw
    }
  }, [canvasCtx, rect])

  useEffect(() => {
    let timer = setInterval(() => {
      requestAnimationFrame(() => canvasDraw?.draw(frameArr[frameIndex]))
      if (frameIndex >= frameArr.length - 1) clearInterval(timer)
      else setIndex((prev) => prev + 1)
    }, interTime)

    return () => {
      clearInterval(timer)
    }
  }, [frameArr, frameIndex, canvasDraw, interTime])

  const handleIntervalChange = (value: number) => {
    setInterTime(0 + Math.floor(200 * value))
  }

  // Initial setup
  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas == null) return
    setCtx(canvas.getContext("2d") as CanvasRenderingContext2D)
    setRect({ width: canvas.clientWidth, height: canvas.clientHeight })
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight
    return () => canvasCtx?.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
  }, [canvasCtx])

  // Set rect width&height
  const onResize = useCallback(() => {
    const canvas = canvasRef.current
    if (canvas == null) return
    setCtx(canvas.getContext("2d") as CanvasRenderingContext2D)
    setRect({ width: canvas.clientWidth, height: canvas.clientHeight })
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight
  }, [canvasRef])

  // Listen window resize
  useEffect(() => {
    window.addEventListener("resize", () => onResize())
    return () => {
      window.removeEventListener("resize", () => onResize())
    }
  }, [onResize])

  return (
    <>
      <select
        className={styles.select}
        name="selectSortMethod"
        onChange={(e) => setSortMethod(e.target.value)}
      >
        {Object.keys(sortMethodMap).map((name) => (
          <option key={name}>{name}</option>
        ))}
      </select>
      <p>Frame Interval: {interTime}ms</p>
      <SlideBlock onChange={handleIntervalChange}></SlideBlock>
      <div className={styles.container}>
        <canvas className={styles.canvas} ref={canvasRef}></canvas>
      </div>
    </>
  )
}
