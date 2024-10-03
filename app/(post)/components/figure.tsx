export function Figure({ wide = false, children }) {
  return (
    <div
      className={`text-center ${
        wide
          ? `relative bg-gray-100 before:absolute before:left-[-1000px] before:top-[0] before:z-[-1] before:h-[100%] before:w-[10000%] before:bg-gray-100 before:content-[""] dark:bg-[#111] before:dark:bg-[#111]`
          : ""
      } `}
    >
      {children}
    </div>
  )
}
