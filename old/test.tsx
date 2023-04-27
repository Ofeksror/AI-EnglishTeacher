import fs from 'fs';
import { Configuration, OpenAIApi } from 'openai';

class CustomFormData extends FormData {
    getHeaders() {
        return {}
    }
}

const configuration = new Configuration({
    apiKey: "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", // process.env.OPENAI_API_KEY,
    formDataCtor: CustomFormData
})

const openai = new OpenAIApi(configuration);


const filepath = "/bloop.mp3"
// const audioData = fs.readFileSync(audioFilePath, { encoding: 'base64' });
// console.log(file);


const test = async () => {
    const audioBlob = await fetch(filepath).then((response) => response.blob());
    console.log(audioBlob);
    const audioFile = new File([audioBlob], 'recording.mp3', { type: audioBlob.type });
    // const response = await openai.createTranscription(audioFile, 'whisper-1');
    
    console.log("hello");
}


export default test;

// NEW KEY: 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