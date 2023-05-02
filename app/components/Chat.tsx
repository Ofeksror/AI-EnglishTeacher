'use client'
import React, { useEffect, useRef } from 'react'
import { useChat } from '../context/ChatContext'
import styles from './Chat.module.css'

const Chat: React.FC = () => {
    const { messages } = useChat();
    const lastMessageRef = useRef(null);

    useEffect(() => {
        lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className={styles.chatContainer}>
            <div className={styles.messagesList}>
                {messages.map((message, index) => {
                    if (message.isUser) {
                        return (
                            <div className={`${styles.chatMessage} ${styles.right}`} key={index}>
                                <p>{message.content}</p>
                            </div>
                        )
                    }
                    else {
                        return (
                            <div className={`${styles.chatMessage} ${styles.left}`} key={index}>
                                <p>{message.content}</p>

                                {message.corrections.length > 0 && <p className={styles.listHeader}>Corrections:</p>}
                                <ul>
                                    {
                                        message.corrections.map((correction, index) => (
                                            <li key={index}><span>{correction}</span></li>
                                            ))
                                        }
                                </ul>
                                {message.improvements.length > 0 && <p className={styles.listHeader}>Improvements:</p>}
                                <ul>
                                    {
                                        message.improvements.map((improvement, index) => (
                                            <li key={index}><span>{improvement}</span></li>
                                        ))
                                    }
                                </ul>
                            </div>
                        )
                    }
                })}
                <div ref={lastMessageRef} />
            </div>
        </div>
    )
}

export default Chat;