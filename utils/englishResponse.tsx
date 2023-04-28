import { Configuration, OpenAIApi } from 'openai';

// Solves an issue: TypeError: localVarFormParams.getHeaders is not a function
// solution from https://github.com/openai/openai-node/issues/75
class CustomFormData extends FormData {
    getHeaders() {
        return {}
    }
}

const configuration = new Configuration({
    apiKey: "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",
    // formDataCtor: CustomFormData,
})

const openai = new OpenAIApi(configuration);

console.log("I executed now");

export const getInitialResponse = async (message: string) => {
    await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{role: 'user', content: `
                You are ChatGPT, simulating a friendly conversation with a user to help them improve their English language skills. Engage with the user as a friend, discussing various topics, asking interesting questions, and responding to their inquiries. Your replies should not be overly informative unless it is relevant to the context. Provide concise, informative, and engaging replies to the conversation. For each message from the user, generate a response that consists of three parts: a reply to the conversation, grammar corrections, and feedback on sentence structure or word choice. Limit corrections and feedback to four items each, selecting the most important ones if there are more than five. Avoid repeating yourself in both parts. 
                Your response would be structured in the following JSON format, and will not include any text outside of the JSON object.
                
                {
                "message": "The reply to the conversation",
                "corrections": [
                    "1": "correction 1",
                    ...
                ],
                "improvements": [
                    "1": "improvement 1",
                    ...
                ]
                }
                
                If there are no mistakes or improvements, the arrays should be empty.
                
                The user's message: "${ message }"
            `}],
            max_tokens: 500,
            temperature: 0.7,
        })
        .then((response) => {
            const respMessage: Message = {
                isUser: false,
                ...JSON.parse(response.data.choices[0].message.content)
            } as Message;

            return respMessage;
        })
        .catch((error) => {
            console.error(error);
        })
}

export const getResponse = async (transcript: any) => {
    return;
}