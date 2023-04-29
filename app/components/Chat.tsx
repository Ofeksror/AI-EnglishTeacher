'use client'
import React, { useEffect, useState } from 'react'
import { Message } from '@/utils/types';
import { messagesHistory } from '@/utils/englishResponse';


interface Props {

}

const Chat: React.FC<Props> = ({}) => {
    
    const messages = messagesHistory;

    const [ history, setHistory ] = useState<Message[]>();



    return (
        <div className='chat-container' style={{border: '2px solid black', borderRadius: '20px', padding: '30px'}}>
            {
                history.map((message, index) => (
                    <div key={index}>{message.content}</div>
                ))
            }
        </div>
    )
}

export default Chat;

                /*
                messages.map((message, index) => {
                    if (message.isUser) {
                        return (
                            <div className='chat-message right'>
                                <p>{message.content}</p>
                            </div>
                        );
                    }
                    else {
                        return (
                            <div className='chat-message left'>
                                <p>{message.content}</p>
                                <ul>
                                    {
                                        message.corrections.map((correction) => (
                                            <li>{correction}</li>
                                        ))
                                    }
                                </ul>
                                <ul>
                                    {
                                        message.improvements.map((improvement) => (
                                            <li>{improvement}</li>
                                        ))
                                    }
                                </ul>
                            </div>
                        )
                    }
                }) */