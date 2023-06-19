'use client';
import useWhisper from '@chengsokdara/use-whisper';
import { useEffect, useRef, useState } from 'react';
import { Message, useChat } from '../context/ChatContext';
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai';
import styles from './Recorder.module.css';
import { BiMicrophone, BiStop, BiPause } from 'react-icons/bi';

// Solves an issue: TypeError: localVarFormParams.getHeaders is not a function
// solution from https://github.com/openai/openai-node/issues/75
class CustomFormData extends FormData {
    getHeaders() {
        return {}
    }
}

const configuration = new Configuration({
    apiKey: process.env.OPENAI_KEY,
    formDataCtor: CustomFormData,
})

const openai = new OpenAIApi(configuration);

const contextHistory: ChatCompletionRequestMessage[] = [];

const prompt: string = `
You are ChatGPT, your primary task is to help the user improve their English proficiency in a friendly and interactive conversation. You are expected to follow these specific instructions:

1. Maintain a dialogue with the user. Be friendly, ask questions, and discuss the topics the user is interested in. Be concise, engaging, and informative only when it adds value to the conversation.

2. For every user message, your response should have three components:
    - A reply to the message for continuing the conversation.
    - Grammar corrections for the message of the user, excluding errors related to capitalization, punctuation, and spelling.
    - Feedback on structure of the sentence the user provided, along with suggesting idioms or synonyms that could be used to enhance the sentence.

3. Avoid repetition in both corrections and improvements.

4. Limit the corrections and feedback to a maximum of four, focusing on the most crucial ones if there are more than four.

5. Do not correct the grammar or structure of the response you generate for the conversation.

6. Do not mention capitalization, punctuation, and spelling errors.

7. Always structure your responses in the following JSON format:

    {
        "content": "Your response to the user's message",
        "corrections": [ "List of grammar corrections, if any" ],
        "improvements": [ "List of improvements on sentence structure, suggested idioms or synonyms, if any" ]
    }

8. The 'corrections' and 'improvements' fields should be empty arrays if there are no items to note.

9. IMPORTANT: Do not generate any text outside of the JSON object.

You're now responding to the user's message:
`

const reminderPrompt: string = ``

let userMessageCounter: number = 0;

const Recorder: React.FC = () => {
    // Initial Setup
    const initialRender = useRef(true);
    
    const {
        recording, speaking, transcribing, transcript, pauseRecording, startRecording, stopRecording,
    } = useWhisper({
        apiKey: process.env.OPENAI_KEY,
        whisperConfig: { language: 'en', },
        // removeSilence: true,
    })
    const { messages, addMessage } = useChat();

    
    // Generate conversation for testing.
    /*
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
    */


    // Handle new recordings
    useEffect(() => {
        // Ignore initial render
        if (initialRender.current) {
            initialRender.current = false;
            return;
        }

        // Ignore empty transcript
        if (!transcript || transcript.text == "" || transcript.text == undefined) {
            console.log("Empty transcript")
            return;
        }

        userMessageCounter++;
        
        const contextContent = () => {
            if (userMessageCounter === 1) {
                return `${ prompt } "${ transcript.text }"`
            } else if (userMessageCounter % 3 === 0) {
                return `${ reminderPrompt } ${ transcript.text }`
            } else {
                return `${ transcript.text }`
            }
        }
        
        // Add user message to context history
        contextHistory.push({
            role: 'user',
            name: 'user',
            content: contextContent(),
        } as ChatCompletionRequestMessage)

        // Add user message to chat
        addMessage({
            role: 'user',
            name: 'user',
            content: transcript.text,
            isUser: true,
        } as Message);

        // Get response from GPT
        getResponse();

    }, [transcript])

    const getResponse = async () => {
        console.log(contextHistory);
        return await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: contextHistory,
            max_tokens: 500,
            temperature: 0.7,
            })
            .then((response) => {
                // Parse response to JSON
                try {
                    const rawResponse = response.data.choices[0].message.content;

                    console.log(rawResponse);

                    const jsonResponse = rawResponse.substring(
                        rawResponse.indexOf('{'),
                        rawResponse.lastIndexOf('}') + 1
                    );

                    if (jsonResponse == "")
                    {
                        contextHistory.push({
                            role: 'user',
                            name: 'you',
                            content: rawResponse,
                        } as ChatCompletionRequestMessage)

                        addMessage({
                            role: 'user',
                            name: 'you',
                            isUser: false,
                            content: rawResponse,
                        } as Message);

                        return;
                    }

                    const parsedResponse = JSON.parse(jsonResponse);
                    
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
        <div className={styles.recordingContainer}>
            { !recording && <button onClick={() => startRecording()}>< BiMicrophone /></button> }
            { recording && <>
                <button onClick={() => pauseRecording()}>< BiPause /></button>
                <button onClick={() => stopRecording()}>< BiStop /></button>
            </> }
        </div>
    )
}

export default Recorder;
