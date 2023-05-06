'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useChat } from '../context/ChatContext'
import styles from './Chat.module.css'
import { useSpeechSynthesis } from 'react-speech-kit';
import { RxSpeakerLoud, RxPause } from 'react-icons/rx';

const Chat: React.FC = () => {
    const { messages } = useChat();
    const afterMessagesRef = useRef(null);

    const { speak, cancel, speaking } = useSpeechSynthesis();
    const [currentlyPlaying, setCurrentlyPlaying] = useState(null);

    useEffect(() => {
        afterMessagesRef.current.scrollIntoView({ behavior: "smooth" });

        if (messages.length != 0)
        {
            !messages[messages.length - 1].isUser && speak({ text: messages[messages.length - 1].content });
            setCurrentlyPlaying((messages.length - 1).toString());
        }
    }, [messages]);

    useEffect(() => {
        if (!speaking)
        {
            setCurrentlyPlaying(null);
        }
    }, [speaking]);

    return (
        <div className={styles.chatContainer}>
            <div className={styles.messagesList}>
                {messages.map((message, index) => {
                    if (message.isUser) {
                        return (
                            <div className={`${styles.chatMessage} ${styles.right}`} key={index + "user"}>
                                <p>{message.content}</p>
                            </div>
                        )
                    }
                    else {
                        return (
                            <>
                                <div className={`${styles.chatMessage} ${styles.left}`} key={index + "gpt"}>
                                    <p>{message.content}</p>
                                    <button className={(index.toString() == currentlyPlaying) ? styles.pauseButton : styles.speakingButton} onClick={
                                        () => {
                                            if (index.toString() == currentlyPlaying) {
                                                cancel();
                                                setCurrentlyPlaying(null);
                                            }
                                            else {
                                                cancel();
                                                setCurrentlyPlaying(index.toString());
                                                speak({ text: message.content });
                                            }
                                        }}>{(index == currentlyPlaying) ? <RxPause /> : <RxSpeakerLoud/>}
                                    </button>
                                </div>
                                { ((message.corrections) && (message.corrections.length > 0)) &&
                                    <div className={`${styles.chatNote} ${styles.left}`} key={index + "crct"}>
                                        <div>
                                            <p className={styles.listHeader}>Corrections:</p>
                                            <ul>
                                                {
                                                    message.corrections.map((correction, index) => (
                                                        <li key={index}><span>{correction}</span></li>
                                                        ))
                                                }
                                            </ul>
                                        </div>
                                        <button className={(index.toString() + "crct" == currentlyPlaying) ? styles.pauseButton : styles.speakingButton} onClick={
                                            () => {
                                                if ((index.toString() + "crct") == currentlyPlaying) {
                                                    cancel();
                                                    setCurrentlyPlaying(null);
                                                }
                                                else {
                                                    cancel();
                                                    setCurrentlyPlaying(index.toString() + "crct");
                                                    speak({ text: message.corrections.join(".") });
                                                }
                                            }}>{(index.toString() + "crct" == currentlyPlaying) ? <RxPause /> : <RxSpeakerLoud/>}
                                        </button>
                                    </div>
                                }
                                { ((message.improvements) && (message.improvements.length > 0)) &&
                                    <div className={`${styles.chatNote} ${styles.left}`} key={index + "impr"}>
                                        <div>
                                            <p className={styles.listHeader}>Improvements:</p>
                                            <ul>
                                                {
                                                    message.improvements.map((improvement, index) => (
                                                        <li key={index}><span>{improvement}</span></li>
                                                        ))
                                                    }
                                            </ul>
                                        </div>
                                        <button className={(index.toString() + "impr" == currentlyPlaying) ? styles.pauseButton : styles.speakingButton} onClick={
                                            () => {
                                                if ((index.toString() + "impr") == currentlyPlaying) {
                                                    cancel();
                                                    setCurrentlyPlaying(null);
                                                }
                                                else {
                                                    cancel();
                                                    setCurrentlyPlaying(index.toString() + "impr");
                                                    speak({ text: message.improvements.join(".") });
                                                }
                                            }}>{(index.toString() + "impr" == currentlyPlaying) ? <RxPause /> : <RxSpeakerLoud/>}
                                        </button>
                                    </div>
                                }
                            </>
                        )
                    }
                })}
                <div ref={afterMessagesRef} />
            </div>
        </div>
    )
}

export default Chat;