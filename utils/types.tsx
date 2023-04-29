import { ChatCompletionRequestMessage, ChatCompletionRequestMessageRoleEnum } from "openai";

export interface Message extends ChatCompletionRequestMessage {
    role: ChatCompletionRequestMessageRoleEnum; // 'user'
    name: string;

    content: string; // mutual

    isUser: boolean;
    corrections?: any[]; // Update to either a string or an HTML component
    improvements?: any[]; // Update to either a string or an HTML component
}