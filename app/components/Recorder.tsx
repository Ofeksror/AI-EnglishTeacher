'use client';
import { useEffect } from 'react';

interface Props {
    startRecording: any;
    pauseRecording: any;
    stopRecording: any;
}

const Recorder: React.FC<Props> = ({ startRecording, pauseRecording, stopRecording }) => {
    return (
        <div className='translator-container'>
            <button onClick={() => startRecording()}>Start</button>
            <button onClick={() => pauseRecording()}>Pause</button>
            <button onClick={() => stopRecording()}>Stop</button>
        </div>
    )
}

export default Recorder;