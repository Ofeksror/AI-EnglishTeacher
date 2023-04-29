'use client'
import React, { useEffect, useState, useRef } from 'react'
import { useWhisper } from '@chengsokdara/use-whisper'
import Translator from './Translator'
import Recorder from './Recorder'
import Corrections from './Corrections'
import { Message } from '@/utils/types'

import Tester from './Tester'

import { getResponse, getInitialResponse } from '@/utils/englishResponse'

const Utilities: React.FC = () => {
    const initialRender = useRef(true);
    const [ messages, setMessages ] = useState<Message[]>([]);

    const {
        recording, speaking, transcribing, transcript, pauseRecording, startRecording, stopRecording,
    } = useWhisper({
        apiKey: "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",
        whisperConfig: { language: 'en', },
        removeSilence: true,
    })

    useEffect(() => {
        // If it's the initial render, set initialRender.current to false and return
        if (initialRender.current) {
            initialRender.current = false;
            return;
        }

        // Append the latest message from the user
        setMessages([...messages, { isUser: true, message: transcript.text } ]);

        // Send transcript to ChatGPT
        if (messages.length == 0) { 
            // Add transcript to messages array
            
            // Initialize conversation with AI
            const promise = getInitialResponse(transcript.text);
            promise.then((response) => {
                const respMessage: Message = {
                    isUser: false,
                    ...JSON.parse(response.data.choices[0].message.content)
                } as Message;

                console.log({respMessage})
            })

            return;
        }
        
        // TODO: Continue the conversation based on history

    }, [transcript]);

    return (
        <aside>
            <Corrections transcript={transcript}/>
            <Translator />
            <Recorder startRecording={startRecording} pauseRecording={pauseRecording} stopRecording={stopRecording} />
            <Tester />
        </aside>
    )
}

export default Utilities;