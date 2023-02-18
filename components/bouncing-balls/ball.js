function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

function randomColor() {
  return "rgb(" + random(0, 255) + ", " + random(0, 255) + ", " + random(0, 255) + ")"
}

function Ball(x, y, velX, velY, color, size) {
  this.x = x
  this.y = y
  this.velX = velX
  this.velY = velY
  this.color = color
  this.size = size
}

Ball.prototype.draw = function (ctx) {
  ctx.beginPath()
  ctx.fillStyle = this.color
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
  ctx.fill()
}

Ball.prototype.update = function (width, height) {
  if (this.x + this.size >= width) {
    this.velX = -this.velX
  }

  if (this.x - this.size <= 0) {
    this.velX = -this.velX
  }

  if (this.y + this.size >= height) {
    this.velY = -this.velY
  }

  if (this.y - this.size <= 0) {
    this.velY = -this.velY
  }

  this.x += this.velX
  this.y += this.velY
}

Ball.prototype.collisionDetect = function () {
  for (let j = 0; j < balls.length; j++) {
    if (this !== balls[j]) {
      const dx = this.x - balls[j].x
      const dy = this.y - balls[j].y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < this.size + balls[j].size) {
        balls[j].color = this.color = randomColor()
      }
    }
  }
}

let balls = []

function loop(ctx, width, height) {
  while (balls.length < 5) {
    let size = random(10, 20)
    let ball = new Ball(
      // 为避免绘制错误，球至少离画布边缘球本身一倍宽度的距离
      random(0 + size, width - size),
      random(0 + size, height - size),
      random(-7, 7),
      random(-7, 7),
      randomColor(),
      size
    )
    balls.push(ball)
  }

  console.log("asdasdasd")

  return () => {
    ctx.fillStyle = "rgba(0, 0, 0, 0.25)"
    ctx.fillRect(0, 0, width, height)

    for (let i = 0; i < balls.length; i++) {
      balls[i].draw(ctx)
      balls[i].update(width, height)
      balls[i].collisionDetect()
    }
  }
}

export { loop }
