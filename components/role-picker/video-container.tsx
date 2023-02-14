export default function VideoContainer({ ...props }) {
  return (
    <div style={{ width: "100%" }}>
      <video
        src={props.src}
        data-canonical-src={props.dataCanonicalSrc || props.src}
        muted={true}
        controls={true}
        style={{
          minHeight: 200,
          maxHeight: 640,
          width: "100%",
          border: "1px solid #eaeaea",
          borderRadius: "6px",
          maxWidth: "100%",
          background: "#fafafa"
        }}
      ></video>
    </div>
  )
}
