'use client';
import useWhisper from '@chengsokdara/use-whisper';
import { useEffect, useRef } from 'react';
import { getMessageResponse } from '@/utils/englishResponse';

const Recorder: React.FC = () => {
    const initialRender = useRef(true);
    
    const {
        recording, speaking, transcribing, transcript, pauseRecording, startRecording, stopRecording,
    } = useWhisper({
        apiKey: "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",
        whisperConfig: { language: 'en', },
        removeSilence: true,
    })
    
    useEffect(() => {
        // Ignore initial rencder
        if (initialRender.current) {
            initialRender.current = false;
            return;
        }

        getMessageResponse(transcript.text);
    }, [transcript])

    return (
        <div className='translator-container'>
            <button onClick={() => startRecording()}>Start</button>
            <button onClick={() => pauseRecording()}>Pause</button>
            <button onClick={() => stopRecording()}>Stop</button>
        </div>
    )
}

export default Recorder;