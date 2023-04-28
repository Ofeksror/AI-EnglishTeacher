import VideoCamera from "./components/VideoCamera"
import Utilities from "./components/Utilities"

export default function Homepage() {
  return (
    <div className="mainDiv">
      <main>
        <VideoCamera />
        <VideoCamera />
      </main>
      <Utilities />
    </div>
  )
}
