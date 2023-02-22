import { useCallback, useEffect, useRef, useState } from "react"

export const useSlide = () => {
  const domRef = useRef<HTMLDivElement>(null)
  const conRef = useRef<HTMLDivElement>(null)
  const cbRef = useRef<((e: number) => void) | null>(null)
  const [moveFlag, setFlag] = useState(false)
  const [left, setLeft] = useState(0)
  const [startX, setStartX] = useState(0)

  const slideCallback = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (domRef.current && conRef.current && moveFlag) {
        const deltaX = e instanceof TouchEvent ? e.touches[0].clientX - startX : e.movementX
        e instanceof TouchEvent && setStartX(e.touches[0].clientX)
        // const deltaX = e.movementX
        const conWidth = conRef.current.clientWidth
        const width = domRef.current.clientWidth
        const newLeft =
          left + deltaX >= 0
            ? left + deltaX <= conWidth - width
              ? left + deltaX
              : conWidth - width
            : 0
        domRef.current.style.left = `${newLeft}px`
        setLeft(newLeft)
        cbRef.current?.call(null, newLeft / (conWidth - width))
      }
    },
    [domRef, conRef, moveFlag, left, cbRef, startX]
  )

  useEffect(() => {
    const mousedown = () => setFlag(true)
    const mouseup = () => setFlag(false)
    const block = domRef.current
    block?.addEventListener("mousedown", mousedown)
    window.addEventListener("mousemove", slideCallback)
    window.addEventListener("mouseup", mouseup)

    const touchstart = (e: TouchEvent) => (setFlag(true), setStartX(e.touches[0].clientX))
    const touchend = (e: TouchEvent) => setFlag(true)
    block?.addEventListener("touchstart", touchstart)
    window.addEventListener("touchmove", slideCallback)
    window.addEventListener("touchend", touchend)

    return () => {
      block?.removeEventListener("mousedown", mousedown)
      window.removeEventListener("mousemove", slideCallback)
      window.removeEventListener("mouseup", mouseup)

      block?.removeEventListener("touchstart", touchstart)
      window.removeEventListener("touchmove", slideCallback)
      window.removeEventListener("touchend", touchend)
    }
  }, [domRef, slideCallback])

  return {
    domRef,
    conRef,
    cbRef
  }
}
