import { parseISO, format } from "date-fns"

export default function Date({ dateString }: { [key: string]: any }) {
  const date = parseISO(dateString)
  return <time dateTime={dateString}>{format(date, "LLLL d, yyyy")}</time>
}
