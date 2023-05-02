'use client'
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai';
import { Message } from './types';
import { useChat } from '@/app/context/ChatContext';

// Solves an issue: TypeError: localVarFormParams.getHeaders is not a function
// solution from https://github.com/openai/openai-node/issues/75
class CustomFormData extends FormData {
    getHeaders() {
        return {}
    }
}

const configuration = new Configuration({
    apiKey: "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",
    formDataCtor: CustomFormData,
})

const openai = new OpenAIApi(configuration);

const prompt: string = `
    You are ChatGPT, simulating a friendly conversation with a user to help them improve their English language skills. Engage with the user as a friend, discussing various topics, asking interesting questions, and responding to their inquiries. Your replies should not be overly informative unless it is relevant to the context. Provide concise, informative, and engaging replies to the conversation. For each message from the user, generate a response that consists of three parts: a reply to the conversation, grammar corrections, and feedback on sentence structure or word choice. Limit corrections and feedback to four items each, selecting the most important ones if there are more than five. The arrays should be empty if there are no corrections or improvements to note. Avoid repeating yourself in both parts. 
    Always structure your responses in the following JSON format, and do not include any text outside of the JSON object.

    {
        "message": "The reply to the conversation",
        "corrections": [
            "correction 1",
            "correction 2"
        ],
        "improvements": [
        ]
    }

    The user's message: `

const { messages, addMessage } = useChat();
const contextHistory: ChatCompletionRequestMessage[] = [];

export const getMessageResponse = async (message: string) => {
    if (messages.length == 0) {
        addMessage({
            role: 'user',
            name: 'user',
            content: message,
            isUser: true,
        } as Message)
        contextHistory.push({
            role: 'user',
            name: 'user',
            content: `${ prompt } "${ message }"`,
        } as ChatCompletionRequestMessage)
    }
    else {
        addMessage({
            role: 'user',
            name: 'user',
            content: message,
            isUser: true,
        } as Message)
        contextHistory.push({
            role: 'user',
            name: 'user',
            content: message,
        } as ChatCompletionRequestMessage)
    }
    
    return await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: contextHistory,
        max_tokens: 500,
        temperature: 0.7,
        })
        .then((response) => {
            try {
                const parsedJSON = JSON.parse(response.data.choices[0].message.content);

                // Add response to message history for context
                addMessage({
                    role: 'user',
                    name: 'you',
                    isUser: false,
                    ...parsedJSON
                } as Message);
                contextHistory.push({
                    role: 'user',
                    name: 'you',
                    content: parsedJSON.content,
                } as ChatCompletionRequestMessage)
                

                console.log(messages);
            } catch (err) {
                console.error(`ERROR: ${err}`);
                return;
            }
        })
        .catch((error) => {
            console.error(error);
        })
}