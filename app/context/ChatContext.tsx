'use client'
import { ChatCompletionRequestMessage, ChatCompletionRequestMessageRoleEnum } from "openai";
import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";

interface Message extends ChatCompletionRequestMessage {
    role: ChatCompletionRequestMessageRoleEnum;
    name: string;
    content: string;
    isUser: boolean;
    corrections?: any[];
    improvements?: any[];
}

type ChatContextType = {
    messages: Message[];
    contextHistory: ChatCompletionRequestMessage[];
    setMessages: Dispatch<SetStateAction<Message[]>>;
    addMessage: (newMessage: Message) => void;
};

const ChatContext = createContext<ChatContextType>({} as ChatContextType);

interface ChatProviderProps {
    children: React.ReactNode;
}

const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const contextHistory: ChatCompletionRequestMessage[] = [];

    return (
        <ChatContext.Provider value={{ messages, contextHistory, setMessages}}>
            {children}
        </ChatContext.Provider>
    );
};

const useChat = () => {
    return useContext(ChatContext);
}

export default ChatProvider;
export { useChat };
export type { Message };