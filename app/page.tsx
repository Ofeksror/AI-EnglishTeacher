import Chat from "./components/Chat"
import Recorder from "./components/Recorder"

export default function Homepage() {
  return (
    <div className="mainDiv">
        <Chat />
        <Recorder />
    </div>
  )
}