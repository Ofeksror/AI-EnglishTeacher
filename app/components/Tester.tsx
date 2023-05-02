'use client'
import React, { useState } from 'react'
import { useChat } from '../context/ChatContext';

const Tester = () => {
    const { messages, setMessages } = useChat();
    const [ liveMessage, setLiveMessage ] = useState('');

  return (
    <div>
        <p>{messages.map((element) => `|||\t${element.content}\t|||`)}</p>
        <input value={liveMessage} onChange={(e) => setLiveMessage(e.target.value)}>
        </input>
        <button onClick={() => setMessages([...messages, {role: 'user', name: 'user', content: liveMessage, isUser: true}])}>Add</button>
    </div>
  )
}

export default Tester

/*

I need assistance with my code
I am building a web chat-app using TypeScript, React and NextJS.

The chat is a conversation between the user and AI

I have defined a context object for the state variable that contains a list of the chat messages
I use it with:
const { messages, setMessages } = useChat()

I defined a component that has an input field and a button
Whenever I press the button the input field is added to the list of messages
I use it with:

const handleClick = () => {
        addMessage({
            role: 'user',
            name: 'user',
            content: inputContent,
            isUser: true,
        } as Message);
        
        getResponse();
        setLiveMessage('');
    }

const addMessage = (newMessage: Message) => {
    setMessages([...messages, newMessage])
}

The code for getResponse:
const getResponse = () => {
    const response = getMessageFromAI();

    addMessage({
        role: 'ai',
        name: 'ai',
        content: response, 
        isUser: false,
    } as Message);
}


But for some reason the list of messages is not updated properly.
The first time I press the button the user's message is updated properly.
But then when the getResponse function is called the list of messages is replaced with the response of the AI
And then whenever the user adds more messages they keep getting replaced with the ones of the AI

Please help me fix this problem,
and if further clarification is needed please let me know, I will be happy to provide more code.

*/