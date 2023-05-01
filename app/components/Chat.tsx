'use client'
import React from 'react'

const Chat: React.FC = () => {
    
    // const { messages } = useChatContext();
    // const messages = [{content: "hey"}, {content: "bye"}];

    return (
        <div className='chat-container' style={{border: '2px solid black', borderRadius: '20px', padding: '30px'}}>
            { /*
                messages.map((message, index) => (
                    <div key={index}>
                         {message.content}}
                    </div>
                ))
                */ }
            2
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