'use client'
import { ChatCompletionRequestMessage, ChatCompletionRequestMessageRoleEnum } from "openai";
import { ReactNode, createContext, useContext, useState } from "react";

export interface Message extends ChatCompletionRequestMessage {
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

export const useChat = () => {
    return useContext(ChatContext);
};

const ChatProvider: React.FC<ChatProviderProps> = ({children}) => {
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

interface ChatProviderProps {
    children: ReactNode;
}

export default ChatProvider;

// export const ChatProvider: React.FC<ChatProviderProps> = ({children}) => {
//     const [ messages, setMessages ] = useState<Message[]>([]);
    
//     const addMessage = (message: Message) => {
//         setMessages((prevMessages) => [...prevMessages, message]);
//     }
    
//     return (
//         <ChatContext.Provider value={{ messages, addMessage }}>
//             { children }
//         </ChatContext.Provider>
//     );
// }



// export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
//     const [ messages, setMessages ] = useState<Message[]>([]);

//     const addMessage = (message: Message) => {
//         setMessages((prevMessages) => [...prevMessages, message]);
//     }

//     return (
//         <ChatContext.Provider value={{ messages, addMessage }}>
//             { children }
//         </ChatContext.Provider>
//     )
// }