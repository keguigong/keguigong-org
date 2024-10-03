import { withHeadingId } from "./utils"

export function H2({ children }) {
  return <h2 className="group relative my-8 text-xl font-bold">{withHeadingId(children)}</h2>
}
