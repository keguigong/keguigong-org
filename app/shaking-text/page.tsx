"use client"
import { FormEvent, useState } from "react"
import "./styles.scss"

export default function ShakingText() {
  const [text, setText] = useState("Shaking Text")

  return (
    <div>
      <h1 className="shaking-text">
        {text.split("").map((t) => (
          <span>{t}</span>
        ))}
      </h1>
    </div>
  )
}
