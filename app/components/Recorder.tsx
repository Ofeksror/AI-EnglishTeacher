'use client';
import useWhisper from '@chengsokdara/use-whisper';
import { useEffect, useRef, useState } from 'react';
import { Message, useChat } from '../context/ChatContext';
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai';

const Recorder: React.FC = () => {
    const initialRender = useRef(true);

    // Solves an issue: TypeError: localVarFormParams.getHeaders is not a function
    // solution from https://github.com/openai/openai-node/issues/75
    class CustomFormData extends FormData {
        getHeaders() {
            return {}
        }
    }

    const configuration = new Configuration({
        apiKey: "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",
        formDataCtor: CustomFormData,
    })

    const openai = new OpenAIApi(configuration);

    const {
        recording, speaking, transcribing, transcript, pauseRecording, startRecording, stopRecording,
    } = useWhisper({
        apiKey: "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",
        whisperConfig: { language: 'en', },
        removeSilence: true,
    })

    const { messages, contextHistory, setMessages } = useChat();

    useEffect(()=> {
        console.log(messages);
        console.log(messages.length);
    }, [messages])
    
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
            content: (messages.length === 0) ? `${ prompt } "${ transcript.text }"` : transcript.text,
        } as ChatCompletionRequestMessage)

        // Get response from GPT
        getResponse();

    }, [transcript])
    
    const prompt: string = `
        You are ChatGPT, simulating a friendly conversation with a user to help them improve their English language skills. Engage with the user as a friend, discussing various topics, asking interesting questions, and responding to their inquiries. Your replies should not be overly informative unless it is relevant to the context. Provide concise, informative, and engaging replies to the conversation. For each message from the user, generate a response that consists of three parts: a reply to the conversation, grammar corrections, and feedback on sentence structure or word choice. Limit corrections and feedback to four items each, selecting the most important ones if there are more than five. The arrays should be empty if there are no corrections or improvements to note. Avoid repeating yourself in both parts. 
        Always structure your responses in the following JSON format, and do not include any text outside of the JSON object.

        {
            "content": "The reply to the conversation",
            "corrections": [
                "correction 1",
                "correction 2"
            ],
            "improvements": [
            ]
        }

        The user's message: `

    const getResponse = async () => {
        console.log({contextHistory});

        return await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: contextHistory,
            max_tokens: 500,
            temperature: 0.7,
            })
            .then((response) => {
                // Parse response to JSON
                try {
                    const parsedResponse = JSON.parse(response.data.choices[0].message.content);
                    console.log(parsedResponse)

                    addMessage({
                        role: 'user',
                        name: 'you',
                        isUser: false,
                        ...parsedResponse
                    } as Message);
                    
                    contextHistory.push({
                        role: 'user',
                        name: 'you',
                        content: parsedResponse.content,
                    } as ChatCompletionRequestMessage)
                } catch (err) {
                    console.error(`ERROR: ${err}`);
                    return;
                }
            })
            .catch((err) => {
                console.error(`ERROR: ${err}`);
            })
    }

    const [ liveMessage, setLiveMessage ] = useState('');

    const handleClick = () => {
        addMessage({
            role: 'user',
            name: 'user',
            content: liveMessage,
            isUser: true,
        } as Message);
        
        contextHistory.push({
            role: 'user',
            name: 'user',
            content: (messages.length === 0) ? `${ prompt } "${ liveMessage }"` : liveMessage,
        } as ChatCompletionRequestMessage)
        
        getResponse();
        setLiveMessage('');
    }

    const addMessage = (newMessage: Message) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
    }

    return (
        <>
            <div className='translator-container'>
                <button onClick={() => startRecording()}>Start</button>
                <button onClick={() => pauseRecording()}>Pause</button>
                <button onClick={() => stopRecording()}>Stop</button>
            </div>
            <div>
                {/* Tester (keyboard input)*/}
                <input type='text'
                value={liveMessage}
                onChange={(e) => setLiveMessage(e.target.value)}>
                </input>
                <button onClick={handleClick}>Submit</button>
            </div>
        </>
    )
}

export default Recorder;