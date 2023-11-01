import { useState } from "react"

export function MotionPath() {
  const [offsetDistance, setOffset] = useState(0)

  const moveDistance = async () => {
    if (offsetDistance > 0) {
      setOffset(0)
      return
    }
    setOffset(100)
  }

  return (
    <>
      <h1>CSS Motion Path</h1>
      <button onClick={moveDistance}>MOVE</button>
      <div className="path-bg bg-1">
        <div className="moving-block path-1"></div>
      </div>
      <div className="path-bg bg-2">
        <div className="moving-block path-2"></div>
      </div>
      <style jsx>{`
        .moving-block {
          position: absolute;
          top: 0;
          left: 0;
          width: 50px;
          height: 50px;
          background: linear-gradient(#fc0, #f0c);
          offset-rotate: 0deg;
          transition: offset-distance 1s ease-in-out;
          offset-distance: ${offsetDistance}%;
        }
        .path-bg {
          position: relative;
          width: 300px;
          height: 180px;
        }
        .bg-1 {
          background-image: url("Ellipse-3.svg");
        }
        .path-1 {
          offset-path: path(
            "M299 90C299 114.364 282.536 136.591 255.552 152.782C228.587 168.961 191.271 179 150 179C108.729 179 71.413 168.961 44.4485 152.782C17.464 136.591 1 114.364 1 90C1 65.6364 17.464 43.4085 44.4485 27.2179C71.413 11.0392 108.729 1 150 1C191.271 1 228.587 11.0392 255.552 27.2179C282.536 43.4085 299 65.6364 299 90Z"
          );
        }
        .bg-2 {
          background-image: url("Vector-1.svg");
        }
        .path-2 {
          offset-path: path(
            "M0 52.8085H44.3836C69.0411 50.6271 109.151 58.0439 72.3288 105.162C26.3014 164.061 90.137 160.788 118.904 136.793C141.918 117.596 156.073 100.981 160.274 95.0734V48.7184L213.151 101.345V28.5403L265.753 80.8942V35.0846L300 1"
          );
        }
      `}</style>
    </>
  )
}
