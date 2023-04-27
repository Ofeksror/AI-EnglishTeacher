import VideoCamera from "./components/VideoCamera"
import Utilities from "./components/Utilities"

export default function Home() {
  return (
    <div>
      <div>
        <VideoCamera />
        <VideoCamera />
      </div>
      <Utilities />
    </div>
  )
}
