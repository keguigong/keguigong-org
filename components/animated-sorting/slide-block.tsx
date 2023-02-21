import { useCallback, useEffect, useRef, useState } from "react"
import styled from "styled-components"

const Container = styled.div`
  height: 30px;
  width: 100%;
  position: relative;
  background: rgba(var(--callout-rgb), 0.5);
  border: 1px solid rgba(var(--callout-border-rgb), 0.3);
  margin: 1rem 0;
`

const Block = styled.div`
  position: absolute;
  width: 50px;
  height: 100%;
  background: rgba(var(--foreground-rgb), 0.5);
  cursor: pointer;
  -webkit-user-drag: none;
`

export default function Slide({ onChange }: any) {
  const { domRef, conRef } = useSlide()

  function useSlide() {
    const domRef = useRef<HTMLDivElement>(null)
    const conRef = useRef<HTMLDivElement>(null)
    const [moveFlag, setFlag] = useState(false)
    const [left, setLeft] = useState(0)

    const slideCallback = useCallback(
      (e: MouseEvent) => {
        if (domRef.current && conRef.current && moveFlag) {
          const width = conRef.current.clientWidth
          const newLeft =
            left + e.movementX >= 0
              ? left + e.movementX <= width - domRef.current.clientWidth
                ? left + e.movementX
                : width - domRef.current.clientWidth
              : 0
          domRef.current.style.left = `${newLeft}px`
          setLeft(newLeft)
          onChange?.call(null, newLeft / (width - domRef.current.clientWidth))
        }
      },
      [domRef, conRef, moveFlag, left, onChange]
    )

    useEffect(() => {
      const mousedown = () => setFlag(true)
      const mouseup = () => setFlag(false)
      domRef.current?.addEventListener("mousedown", mousedown)
      window.addEventListener("mousemove", slideCallback)
      window.addEventListener("mouseup", mouseup)

      return () => {
        domRef.current?.removeEventListener("mousedown", mousedown)
        window.removeEventListener("mousemove", slideCallback)
        window.removeEventListener("mouseup", mouseup)
      }
    }, [domRef, slideCallback])

    return {
      domRef,
      conRef
    }
  }

  return (
    <Container ref={conRef}>
      <Block ref={domRef}></Block>
    </Container>
  )
}
