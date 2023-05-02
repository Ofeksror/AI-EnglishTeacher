'use client';
import useWhisper from '@chengsokdara/use-whisper';
import { useEffect, useRef, useState } from 'react';
import { Message, useChat } from '../context/ChatContext';
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai';
import { useSpeechSynthesis } from 'react-speech-kit';

import { BiMicrophone, BiStop, BiPause } from 'react-icons/bi';

// Solves an issue: TypeError: localVarFormParams.getHeaders is not a function
// solution from https://github.com/openai/openai-node/issues/75
class CustomFormData extends FormData {
    getHeaders() {
        return {}
    }
}

const configuration = new Configuration({
    apiKey: "",
    formDataCtor: CustomFormData,
})

const openai = new OpenAIApi(configuration);

const contextHistory: ChatCompletionRequestMessage[] = [];

const prompt: string = `
You are ChatGPT, simulating a friendly conversation with the user to help them improve their English.
Engage with the user as a friend - ask intresting questions and encourage them to talk about topics they like.
Your replies would be concise and engaging, and only informative if relevant to the context.
For each message from the user, generate a response that consists of three parts:
- A reply to the message of the user and the conversation itself
- Grammer corrections. Ignore capitalization, punctuations and spelling mistakes.
- Feedback on the structure of the sentence, word choice or any idioms that could be put to use.
Limit the corrections and feedbacks to four items at most, selecting the most important ones if there are more than four.
ALWAYS structure your responses in the following JSON format. Do not include any text outside of the JSON object.
{
    "content": "The reply to the conversation",
    "corrections": [
        "correction 1",
        "correction 2"
    ],
    "improvements": [
        "improvement 1"
    ]
}
The arrays should be empty if there are no corrections or improvements to note.
Avoid repeating yourself in both parts.

The user's message you need to respond to:
`

const Recorder: React.FC = () => {
    // Initial Setup
    const initialRender = useRef(true);
    
    const {
        recording, speaking, transcribing, transcript, pauseRecording, startRecording, stopRecording,
    } = useWhisper({
        apiKey: "",
        whisperConfig: { language: 'en', },
        removeSilence: true,
    })
    const { speak } = useSpeechSynthesis();
    const { messages, addMessage } = useChat();

    // Generate conversation for testing.
    useEffect(() => {
        addMessage({
            role: 'user',
            name: 'user',
            content: 'Hello GPT!',
            isUser: true,
        })

        addMessage({
            role: 'user',
            name: 'you',
            content: 'Hello dear student! How are you doing today?\nMy name is GPT, I am your teacher for today :)',
            isUser: false,
            corrections: [
            ],
            improvements: [
            ],
        })

        addMessage({
            role: 'user',
            name: 'user',
            content: 'That\'s great to hear, I\'ve always wanted a personal teacher to teach me the English.',
            isUser: true,
        })
        
        addMessage({
            role: 'user',
            name: 'you',
            content: 'Well, what is your name dear?',
            isUser: false,
            corrections: [
                "I always wanted instead of I've always wanted",
                "Say: to teach me English instead of to teach me *the* English"
            ],
            improvements: [
            ],
        })

        addMessage({
            role: 'user',
            name: 'user',
            content: 'My name\'s Ofek. What should we talk about today?',
            isUser: true,
        })

        addMessage({
            role: 'user',
            name: 'you',
            content: 'Whatever you wish to talk about, Ofek! What are your hobbies?',
            isUser: false,
            corrections: [
                "Say: my name *is* instead of *my name's*"
            ],
            improvements: [
            ],
        })

        addMessage({
            role: 'user',
            name: 'user',
            content: 'I like my hobbies playing video games, watching movies.',
            isUser: true,
        })

        addMessage({
            role: 'user',
            name: 'you',
            content: 'Oh movies! What kind of movies do you like?',
            isUser: false,
            corrections: [  
            ],
            improvements: [
                "I like to ... instead of I like my hobbies",
                "Say: playing video games *and* watching movies instead of playing video games, watching movies"
            ]
        })
    }, [])

    // Handle new recordings
    useEffect(() => {
        // Ignore initial render
        if (initialRender.current) {
            initialRender.current = false;
            return;
        }

        // Ignore empty transcript
        if (!transcript) {
            return;
        }

        // Add user message to chat
        addMessage({
            role: 'user',
            name: 'user',
            content: transcript.text,
            isUser: true,
        } as Message);

        // Add user message to context history
        contextHistory.push({
            role: 'user',
            name: 'user',
            content: (messages.length === 0) ? `${ prompt } "${ transcript.text }"` : `The message: "${transcript.text}". Remember to answer in JSON`,
        } as ChatCompletionRequestMessage)

        // Get response from GPT
        getResponse();

    }, [transcript])

    const getResponse = async () => {
        return await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: contextHistory,
            max_tokens: 500,
            temperature: 0.7,
            })
            .then((response) => {
                // Parse response to JSON
                try {
                    console.log(response.data.choices[0].message.content)
                    const parsedResponse = JSON.parse(response.data.choices[0].message.content);
                    
                    contextHistory.push({
                        role: 'user',
                        name: 'you',
                        content: parsedResponse.content,
                    } as ChatCompletionRequestMessage)
                    
                    addMessage({
                        role: 'user',
                        name: 'you',
                        isUser: false,
                        ...parsedResponse
                    } as Message);

                    speak({ text: parsedResponse.content });
                } catch (err) {
                    console.error(`ERROR: ${err}`);
                    return;
                }
            })
            .catch((err) => {
                console.error(`ERROR: ${err}`);
            })
    }

    return (
        <>
            <div className='translator-container'>
                <button onClick={() => startRecording()}>< BiMicrophone /></button>
                <button onClick={() => pauseRecording()}>< BiPause /></button>
                <button onClick={() => stopRecording()}>< BiStop /></button>
            </div>
        </>
    )
}

export default Recorder;