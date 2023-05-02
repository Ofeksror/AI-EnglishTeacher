'use client'
import { ChatCompletionRequestMessage, ChatCompletionRequestMessageRoleEnum } from "openai";
import { createContext, useContext, useState } from "react"


// 
interface Message extends ChatCompletionRequestMessage {
    role: ChatCompletionRequestMessageRoleEnum; // 'user'
    name: string;

    content: string; // mutual

    isUser: boolean;
    corrections?: any[]; // Update to either a string or an HTML component
    improvements?: any[]; // Update to either a string or an HTML component
}

type ChatContextType = {
    messages: Message[];
    addMessage: (message: Message) => void;
}


const ChatContext = createContext<ChatContextType>({} as ChatContextType);

interface ChatContextProviderProps {
    children: React.ReactNode;
}

const ChatContextProvider = ({ children }: ChatContextProviderProps) => {
    const [ messages, setMessages ] = useState<Message[]>([]);

    const addMessage = (message: Message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
    }

    return (
        <ChatContext.Provider value={{ messages, addMessage }}>
            { children }
        </ChatContext.Provider>
    );
}

const useChat = () => {
    return useContext(ChatContext); 
}

export { ChatContextProvider, useChat };