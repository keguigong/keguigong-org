import styles from "./video-container.module.scss"

export default function VideoContainer({ ...props }) {
  return (
    <div className={styles["video-container"]}>
      <video
        src={props.src}
        data-canonical-src={props.dataCanonicalSrc || props.src}
        muted={true}
        controls={true}
        className={styles["video-tag"]}
      ></video>
    </div>
  )
}
