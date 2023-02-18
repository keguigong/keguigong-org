import { Layout } from "@/components"
import { useEffect, useState } from "react"

function Child({ count }: any) {
  const [ownState, setOwnState] = useState(0)
  console.log("Child created.")

  useEffect(() => {
    console.log("Child effect triggered.")

    return () => {
      console.log("Child effect cleared.")
    }
  }, [count])

  return (
    <div>
      <p>{count}</p>
      <p>{ownState}</p>
      <button onClick={() => setOwnState((prev) => prev + 1)}>+</button>
    </div>
  )
}

export default function Father() {
  const [count, setCount] = useState(0)
  console.log("Father created.")

  useEffect(() => {
    console.log("Father effect triggered.")

    return () => {
      console.log("Father effect cleared.")
    }
  })

  return (
    <Layout>
      <Child count={count}></Child>
      <button onClick={() => setCount((prev) => prev - 1)}>-</button>
      <button onClick={() => setCount((prev) => prev + 1)}>+</button>
    </Layout>
  )
}
