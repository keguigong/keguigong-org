import { withHeadingId } from "./utils"

export function H3({ children }) {
  return <h3 className="group relative my-8 text-lg font-bold">{withHeadingId(children)}</h3>
}
