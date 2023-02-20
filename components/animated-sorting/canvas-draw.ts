export type Frame = {
  data: number[]
  highlight: number[]
  swapped: boolean
}

export class DrawFrame {
  ctx!: CanvasRenderingContext2D
  width!: number
  height!: number

  constructor(ctx: CanvasRenderingContext2D, width: number, height: number) {
    this.ctx = ctx
    this.width = width
    this.height = height
  }

  swapped = false

  updateSize(width: number, height: number) {
    this.width = width
    this.height = height
  }

  fillStyle = "black"
  highlight!: string

  updateStyle(fillStyle: string, highlight: string) {
    this.fillStyle = fillStyle
    this.highlight = highlight
  }

  draw(frame: Frame) {
    this.swapped = false
    const len = frame.data.length
    const maxValue = Math.max.apply(undefined, frame.data)
    const colWidth = this.width / len
    const rectWidth = Math.max(1, 0.618 * colWidth)
    this.ctx.fillStyle = this.fillStyle
    this.ctx.clearRect(0, 0, this.width, this.height)
    let colorArr = ["red", "blue"]
    let count = 0

    for (let i = 0; i < len; i++) {
      const value = frame.data[i]
      const rectHeight = Math.max(1, Math.floor((this.height * value) / maxValue))
      const offset = colWidth * i

      if (this.swapped !== frame.swapped) {
        colorArr = colorArr.reverse()
        this.swapped = frame.swapped
      }

      if (frame.highlight.indexOf(i) > -1) {
        this.ctx.fillStyle = colorArr[count]
        this.ctx.fillRect(offset, this.height - rectHeight, rectWidth, rectHeight)
        this.ctx.fillStyle = this.fillStyle
      } else {
        this.ctx.fillRect(offset, this.height - rectHeight, rectWidth, rectHeight)
      }

      if (count < 1) count++
      else count = 0
    }
  }
}
