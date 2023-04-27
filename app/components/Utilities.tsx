'use client'
import React from 'react'
import { useWhisper } from '@chengsokdara/use-whisper'
import Translator from './Translator'
import Recorder from './Recorder'
import Corrections from './Corrections'

const Utilities: React.FC = () => {
  
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
        <aside>
            <Corrections transcript={transcript}/>
            <Translator />
            <Recorder startRecording={startRecording} pauseRecording={pauseRecording} stopRecording={stopRecording} />
        </aside>
    )
}

export default Utilities;