export function Callout({ emoji = null, text = null, children }) {
  return (
    <div className="my-6 flex items-start bg-gray-200 p-3 text-base dark:bg-[#333] dark:text-gray-300">
      <span className="mr-2 block w-6 scale-[1.2] text-center">{emoji}</span>
      <span className="block grow">{text ?? children}</span>
    </div>
  )
}
