import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import styles from "./bouncing-balls.module.scss"
import { loop as getStartFn } from "./ball"

export default function BouncingBalls() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [canvasCtx, setCtx] = useState<CanvasRenderingContext2D>()
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  const memoLoop = useMemo(() => {
    if (canvasCtx && width && height) return getStartFn(canvasCtx, width, height)
    else return () => {}
  }, [canvasCtx, width, height])

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas == null) return
    let canvasCtx = canvas.getContext("2d") as CanvasRenderingContext2D
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
    let animationId = 0
    const start = () => {
      memoLoop()
      animationId = requestAnimationFrame(start)
    }
    animationId = requestAnimationFrame(start)
    // console.log(animationId, " started")

    return () => {
      cancelAnimationFrame(animationId)
      // console.log(animationId, " canceled")
    }
  }, [memoLoop])

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
