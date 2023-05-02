import VideoCamera from "./components/VideoCamera"
import Utilities from "./components/Utilities"
import { Component } from "react"

export default function Homepage() {
  return (
    <div className="mainDiv">
        <VideoCamera />
        <VideoCamera />
        <Utilities />
    </div>
  )
}