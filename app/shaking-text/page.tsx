"use client"

import { useState } from "react"
import "./styles.scss"

export default function ShakingText() {
  const [text, setText] = useState("Shaking Text")

  return (
    <div>
      <h1 className="shaking-text">
        {text.split("").map((t, i) => (
          <span key={`${i}-${t}`}>{t}</span>
        ))}
      </h1>
    </div>
  )
}
