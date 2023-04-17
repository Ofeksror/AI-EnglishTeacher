import { Configuration, OpenAIApi } from 'openai';
import { Readable } from 'stream';
import fs from 'fs/promises';
// const fs = require("fs");

// KEY: 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
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration);

const transcribeRecording = async (blob: Blob) => {
    // const f = new File([blob], 'recording', { type: 'audio/mpeg'})
    const buffer = await fs.readFile(blob);
    const resp = await openai.createTranscription(buffer, 'whisper-1');
    
    return resp;
}

export default transcribeRecording;