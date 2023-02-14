import { RolePicker3, MdxWrap } from "@/components/role-picker"

export default function Example() {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: 960,
        margin: "0 auto",
        marginTop: "3rem"
      }}
    >
      <MdxWrap title="Example">
        <RolePicker3 />
      </MdxWrap>
    </div>
  )
}
