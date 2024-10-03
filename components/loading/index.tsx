import cs from "classnames"

interface Props {
  className?: string
}

export function Loading({ className }: Props) {
  return <span className={cs("flex h-full w-full items-center justify-center text-lg", className)}>Loading</span>
}
