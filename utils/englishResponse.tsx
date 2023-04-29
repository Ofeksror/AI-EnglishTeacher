import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai';
import { Message } from './types';

// Solves an issue: TypeError: localVarFormParams.getHeaders is not a function
// solution from https://github.com/openai/openai-node/issues/75
class CustomFormData extends FormData {
    getHeaders() {
        return {}
    }
}

const configuration = new Configuration({
    apiKey: "",
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

// const messagesHistory: APIMessage[] = [];
const messagesHistory: ChatCompletionRequestMessage[] = [];

export const initializeConversation = async (message: string) => {
    messagesHistory.push({
        role: 'user',
        content: `${ prompt } "${ message }"`,
        name: 'user'
    } as ChatCompletionRequestMessage)

    console.log(messagesHistory);
    
    return await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messagesHistory,
        max_tokens: 500,
        temperature: 0.7,
        })
        .then((response) => {

            console.log({response});
            
            let parsedJSON;

            try {
                parsedJSON = JSON.parse(response.data.choices[0].message.content);
            } catch (err) {
                console.log(`ERROR: ${err}`);
            }

            const respMessage: Message = {
                isUser: false,
                ...parsedJSON
            } as Message;
            
            // Add response to message history for context
            messagesHistory.push({
                'role': 'user',
                'content': response.data.choices[0].message.content, // The response is still formatted in json as a string
                'name': "you" // Name of GPT (might change later)
            } as ChatCompletionRequestMessage);
            
            console.log(messagesHistory)
            
            return respMessage;
        })
        .catch((error) => {
            console.error(error);
        })
}
    

export const continueConversation = async (message: string) => {
    console.log("Called continueConversation");
    console.log(message);
    console.log(messagesHistory);
        
    messagesHistory.push({
        role: 'user',
        content: message,
        name: 'user'
    } as ChatCompletionRequestMessage)
    
    return await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messagesHistory,
        max_tokens: 500,
        temperature: 0.7,
        })
        .then((response) => {
            console.log("response: ");
            console.log(response);

            const respMessage: Message = {
                isUser: false,
                ...JSON.parse(response.data.choices[0].message.content)
            } as Message;
            
            // Add response to message history for context
            messagesHistory.push({
                'role': 'user',
                'content': response.data.choices[0].message.content,
                'name': "you" // Name of GPT (might change later)
            } as ChatCompletionRequestMessage);

            console.log(messagesHistory)

            return respMessage;
        })
        .catch((error) => {
            console.error(error);
        })
}