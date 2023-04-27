'use client';
import { useWhisper } from '@chengsokdara/use-whisper'
import { useEffect } from 'react';

const Recorder: React.FC = () => {
    const {
        recording,
        speaking,
        transcribing,
        transcript,
        pauseRecording,
        startRecording,
        stopRecording,
    } = useWhisper({
        apiKey: "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",
        whisperConfig: {
          language: 'en',
        },
        removeSilence: true,
    })

    return (
        <div className='translator-container'>
            <p>Transcribed Text: {transcript.text}</p>
            <button onClick={() => startRecording()}>Start</button>
            <button onClick={() => pauseRecording()}>Pause</button>
            <button onClick={() => stopRecording()}>Stop</button>
        </div>
    )
}

export default Recorder;