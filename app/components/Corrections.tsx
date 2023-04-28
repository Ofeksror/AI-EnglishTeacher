'use client'
import React, { useEffect } from 'react'
import { UseWhisperTranscript } from '@chengsokdara/use-whisper/dist/types';

interface Props {
    transcript: UseWhisperTranscript;
}

const Corrections: React.FC<Props> = ({ transcript }) => {
    return (
        <div className='corrections-container' style={{border: '2px solid black', borderRadius: '20px', padding: '30px'}}>
            <p>Transcribed Text: {transcript.text}</p>
        </div>
    )
}

export default Corrections;