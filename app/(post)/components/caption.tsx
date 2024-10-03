export function Caption({ children }) {
  return (
    <span className="my-3 block w-full text-center font-mono text-xs leading-normal text-gray-500">
      <span className="[&>a]:post-link">{children}</span>
    </span>
  )
}
