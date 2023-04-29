'use client'
import { continueConversation, getInitialResponse, initializeConversation } from '@/utils/englishResponse';
import React, { useState } from 'react'
import { useRef } from 'react'
import { Message } from '@/utils/types';

const Tester = () => {

    const [ message, setMessage ] = useState("");
    
    const [ response, setResponse ] = useState<Message>(null);

    let isFirstResponse: boolean = true;

    const handleClick = async () => {
        // Submit to the AI
        if (isFirstResponse) {
            isFirstResponse = false;
            try {
                const respMessage = await initializeConversation(message);
                setResponse(respMessage as Message);
            } catch (error) {
                console.error('Error while getting response:', error);
            }
        }

        else {
            try {
                const respMessage = await continueConversation(message);
                setResponse(respMessage as Message);
            } catch (error) {
                console.error(error);
            }
        }
    }


    return (
        <div>
            <input type='text'
                value={message}
                onChange={(e) => setMessage(e.target.value)}>
            </input>
            <button onClick={handleClick}>Submit</button>

            { response &&
            <div>
                <h3>Response</h3>
                <p> Message: { response.message } </p>
                <p> Corrections: { response.corrections } </p>
                <p> Imorovements: { response.improvements } </p>
            </div>
            }  
        </div>
  )
}

export default Tester