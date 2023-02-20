import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import styles from "./animated-sorting.module.scss"
import { bubble } from "./sorting"
import { DrawFrame, Frame } from "./canvas-draw"

export default function BouncingBalls() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [canvasCtx, setCtx] = useState<CanvasRenderingContext2D>()
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [frameArr] = useState(() => {
    let arr: number[] = []
    let outArr: Frame[] = []
    for (let i = 0; i < 100; i++) {
      arr.push(Math.floor(Math.random() * 100))
    }

    bubble(arr, (arr1, i, j, swapped) => {
      outArr.push({
        data: arr1,
        highlight: [i, j],
        swapped
      })
    })
    return outArr
  })

  const memoLoop = useMemo(() => {
    if (canvasCtx && width && height) {
      const dramFrame = new DrawFrame(canvasCtx, width, height)
      return dramFrame
    }
  }, [canvasCtx, width, height])

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas == null) return
    const canvasCtx = canvas.getContext("2d") as CanvasRenderingContext2D
    setCtx(canvasCtx)
    setWidth(canvas.clientWidth)
    setHeight(canvas.clientHeight)
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight

    return function () {
      canvasCtx?.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
    }
  }, [])

  useEffect(() => {
    let index = 0
    let timer = setInterval(() => {
      requestAnimationFrame(() => memoLoop?.draw(frameArr[index]))
      index++
      if (index >= frameArr.length) {
        clearInterval(timer)
      }
    }, 45)

    return () => {
      clearInterval(timer)
    }
  }, [frameArr, memoLoop])

  const memoResize = useCallback(() => {
    const canvas = canvasRef.current
    if (canvas == null) return
    setCtx(canvas.getContext("2d") as CanvasRenderingContext2D)
    setWidth(canvas.clientWidth)
    setHeight(canvas.clientHeight)
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight
  }, [canvasRef])

  useEffect(() => {
    window.addEventListener("resize", () => memoResize())
    return () => {
      window.removeEventListener("resize", () => memoResize())
    }
  }, [memoResize])

  return (
    <div className={styles.container}>
      <canvas className={styles.canvas} ref={canvasRef}></canvas>
    </div>
  )
}
