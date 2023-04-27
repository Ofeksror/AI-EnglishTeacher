'use client';
import React, { useState, useRef, useEffect } from 'react'
// import { AudioRecorder } from 'react-audio-voice-recorder';
import transcribeRecording from '@/utils/transcribeRecording';

/*=========================================
* TO DO:
* - Figure out how to make the recording work
*   - Possibly if I find a way to access the Media Recorder object (I cant access it through the navigator or the window object)
*   - figure out what happens when you call recording.start(), and recording.end(). Maybe create new functions for them to work properly
* - Recording is undefined at times. Some code needs to run before the component loads (OR maybe set a counter and if it is the first time do something differently, otherwise, do something like always)
* - Update the audio element to preview the recording
* =========================================*/ 


/*
let recording;
let audioChunks = [];


navigator.mediaDevices.getUserMedia({ audio: true })
.then( (stream) => {
  recording = new MediaRecorder(stream);

  recording.ondataavailable = (e) => {
    audioChunks.push(e.data);
    if (recording.state == 'inactive') {
      console.log("Hello")
      let blob = new Blob(audioChunks, {type: 'audio/mpeg'});
      console.log(blob)
      transcribeRecording(blob)
    }
  }
})
*/

const Recorder: React.FC = () => {

  const startButton = useRef<HTMLButtonElement>(null);
  const stopButton = useRef<HTMLButtonElement>(null);
  const audioPreview = useRef<HTMLAudioElement>(null);
  
  const [isRecording, setIsRecording] = useState(false);
  let recording;
  let audioChunks = [];

  // Setup recording
  ( () => {
    
    navigator.mediaDevices.getUserMedia({ audio: true })
    .then( (stream) => {

        console.log(stream);
        console.log("Been here, done that")
        recording = new MediaRecorder(stream);
        console.log({recording})

        recording.ondataavailable = (e) => {
          audioChunks.push(e.data);
          console.log("DATA WAS AVAILABEL!")
          if (recording.state == 'inactive') {
            /*
            let blob = new Blob(audioChunks, {type: 'audio/mpeg'}); // Create a new MPEG blob
            audioPreview.current.src = URL.createObjectURL(blob); // Update the audio preview
            transcribeRecording(blob); // Transcribe the recording
            */
          }
        }
      })
  })()

  const recordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Recording Started");
    setIsRecording(true);
    startButton.current.disabled = true;
    stopButton.current.disabled = false;
    // Change styling
    
    audioChunks = [];
    recording.start();
  }

  const stopHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Recording Stopped");
    setIsRecording(false);
    stopButton.current.disabled = true;
    startButton.current.disabled = false;
    // Change styling
    
    recording.stop();
  }

  return (
    <div className='recorder-container'>
      <button id="start-recording" onClick={recordHandler} ref={startButton}>Start</button>
      <button id="stop-recording" onClick={stopHandler} ref={stopButton}>Stop</button>
    
       <audio src={""} controls={true} ref={audioPreview} />
    </div>
  )
}

export default Recorder;