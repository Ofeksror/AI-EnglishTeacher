'use client'
import React from 'react'
import { useChat } from '../context/ChatContext';

const Chat: React.FC = () => {
    
    const { messages } = useChat();

    return (
        <div className='chat-container' style={{border: '2px solid black', borderRadius: '20px', padding: '30px'}}>
            {messages.map((message, index) => {
                if (message.isUser) {
                    return (
                        <div className='chat-message right' key={index}>
                            <p>{message.content}</p>
                        </div>
                    )
                }
                else {
                    return (
                        <div className='chat-message left' key={index}>
                            <p>{message.content}</p>
                            <ul>
                                {
                                    message.corrections.map((correction, index) => (
                                        <li key={index}>{correction}</li>
                                    ))
                                }
                            </ul>
                            <ul>
                                {
                                    message.improvements.map((improvement, index) => (
                                        <li key={index}>{improvement}</li>
                                    ))
                                }
                            </ul>
                        </div>
                    )
                }
            })}
        </div>
    )
}

export default Chat;