import { useCallback, useEffect, useRef, useState } from "react"
import styles from "./bouncing-balls.module.scss"
import { loop as getStartFn } from "./ball"

export default function BouncingBalls() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [canvasCtx, setCtx] = useState<CanvasRenderingContext2D>()
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  const memoLoop = useCallback(
    canvasCtx && width && height ? getStartFn(canvasCtx, width, height) : () => {},
    [canvasCtx, width, height]
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas == null) return
    setCtx(canvas.getContext("2d") as CanvasRenderingContext2D)
    setWidth(canvas.clientWidth)
    setHeight(canvas.clientHeight)
    canvas.width = width
    canvas.height = height

    let animationId = 0
    const start = () => {
      memoLoop()
      animationId = requestAnimationFrame(start)
    }
    animationId = requestAnimationFrame(start)
    console.log(animationId, " started")

    return function () {
      canvasCtx?.clearRect(0, 0, width, height)
      cancelAnimationFrame(animationId)
      console.log(animationId, " canceled")
    }
  }, [canvasCtx, width, height, memoLoop])

  return (
    <div className={styles.container}>
      <canvas className={styles.canvas} ref={canvasRef}></canvas>
    </div>
  )
}
