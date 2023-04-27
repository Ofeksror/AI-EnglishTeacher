import VideoCamera from "./components/VideoCamera"
import Corrections from "./components/Corrections"
import Translator from "./components/Translator"
import Recorder from "./components/Recorder"

export default function Home() {
  return (
    <div>
      <div>
        <VideoCamera />
        <VideoCamera />
      </div>
      <div>
        { /* <Corrections />  */ }
        { /* <Translator /> */ }
        <Recorder />
      </div>
    </div>
  )
}
