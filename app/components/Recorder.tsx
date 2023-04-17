'use client';
import React, { useState } from 'react'
import { AudioRecorder } from 'react-audio-voice-recorder';
import transcribeRecording from '@/utils/transcribeRecording';

const Recorder: React.FC = () => {
  
  const [audioRec, setAudioRec] = useState<string | null>(null);

  // Gets Called when we press save on the recording
  const addAudioElement = (blob: Blob) => {
    let url = URL.createObjectURL(blob);
    console.log(url)
    setAudioRec(url);
    console.log(blob); // -> Blob { size: 23046, type: "audio/ogg; codecs=opus" }
    // transcribeRecording(blob);
  };

  return (
    <div className='recorder-container'>
      <AudioRecorder onRecordingComplete={addAudioElement} />

      {
        audioRec !== null ?
          ( <audio src={audioRec} controls={true} /> )
          :
          ( <p> No file yet </p> )
      }

      <h2>{audioRec}</h2>

    </div>
  )
}

export default Recorder;