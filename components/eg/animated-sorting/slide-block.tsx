import { useEffect } from "react"
import styled from "styled-components"
import { useSlide } from "./util-use-slide"

const Container = styled.div`
  height: 30px;
  width: 100%;
  position: relative;
  background: rgba(var(--callout-rgb), 0.5);
  border: 1px solid rgba(var(--callout-border-rgb), 0.3);
  margin: 1rem 0;
  -webkit-user-drag: none;
  user-select: none;
`

const Block = styled.div`
  position: absolute;
  width: 50px;
  height: 100%;
  background: rgba(var(--foreground-rgb), 0.5);
  cursor: pointer;
  -webkit-user-drag: none;
  user-select: none;
`

export default function Slide({ onChange }: any) {
  const { domRef, conRef, cbRef } = useSlide()

  useEffect(() => {
    cbRef.current = onChange
  }, [cbRef, onChange])

  return (
    <Container ref={conRef}>
      <Block ref={domRef}></Block>
    </Container>
  )
}
