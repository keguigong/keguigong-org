import { useEffect, useRef } from "react"
import styles from "./bouncing-balls.module.scss"
import { loop } from "./main"

export default function BouncingBalls() {
  let startLoop: () => number
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!!
    const ctx = canvas.getContext("2d")
    const width = canvas.clientWidth
    const height = canvas.clientHeight
    canvas.width = width
    canvas.height = height
    console.log(width, height)
    if (!startLoop) {
      startLoop = loop(ctx, width, height)
    }
    let animationId = startLoop()
    console.log(animationId, " started")

    return function () {
      ctx?.clearRect(0, 0, width, height)
      cancelAnimationFrame(animationId)
      console.log(animationId, " canceled")
    }
  })

  return (
    <div className={styles.container}>
      <canvas className={styles.canvas} ref={canvasRef}></canvas>
    </div>
  )
}
