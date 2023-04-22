import { Configuration, OpenAIApi } from 'openai';
import convertOggToMp3 from './convertOggToMp3';

// Solves an issue: TypeError: localVarFormParams.getHeaders is not a function
// solution from https://github.com/openai/openai-node/issues/75
class CustomFormData extends FormData {
    getHeaders() {
        return {}
    }
}

const configuration = new Configuration({
    apiKey: "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", // was: process.env.OPENAI_API_KEY
    formDataCtor: CustomFormData,
})

const openai = new OpenAIApi(configuration);

const transcribeRecording = async (audioBlob: Blob) => {
    /*console.log(oggBlob.type);
    const audioBlob = convertOggToMp3(oggBlob);
    console.log(typeof(audioBlob)); */
    
    const audioFile = new File([audioBlob], 'recording.mpeg', { type: audioBlob.type });
    console.log(audioFile);
    // const response = await openai.createTranscription(audioFile, 'whisper-1');
    console.log(response.data);
    
    // // return response.data;
}

export default transcribeRecording;


// const transcribeRecording = async (blob: Blob) => {
//     const file: File = new File([blob], 'recording.mpeg', { type: 'audio/mpeg' });
//     const response = await openai.createTranscription(file, 'whisper-1');
    
//     console.log(response);
// }

// import { Readable } from 'stream';
// import fs from 'fs';
// const fs = require("fs");

// KEY: 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