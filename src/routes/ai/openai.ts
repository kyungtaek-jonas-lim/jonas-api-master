import express, { Request, Response, Router } from 'express';
import axios, { AxiosError } from 'axios';
import dotenv from 'dotenv';
import { getUTCDate } from '../../utils/time';

dotenv.config();

// ======================================
// Settings
// ======================================
const router: Router = Router();


// ======================================
// API
// ======================================
router.post('', async (req: Request, res: Response) => {
    const query = req.body.query;
    let model = req.body.model;
    
    if (!query
        || (typeof query !== "string")
        ||  query.trim() === ""
    ) {
        res.status(400).send({error: "'query' is required"});
        return;
    }

    console.log(`[${getUTCDate()}] [OPENAI] request raw data - query: ${query}, model: ${model}`);

    if (!model 
        || (typeof model !== "string")
        || model.trim() === ""
    ) {
        model = "gpt-4o-mini"
        // model = "gpt-3.5-turbo"
    }

    console.log(`[${getUTCDate()}] [OPENAI] refined request data - query: ${query}, model: ${model}`);

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: model,
                messages: [
                    { role: 'system', content: 'You are a professional software engineer with expertise in Python, JavaScript and TypeScript.' },
                    { role: 'user', content: query }
                ],
                max_tokens: 150 // Limit the length of the response messages from the AI service
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const reply = response.data.choices[0].message.content;
        res.json({ reply: reply });
        console.log(`[${getUTCDate()}] [OPENAI] response data - reply: ${reply}`);

    } catch (error: unknown) {
        if (error instanceof AxiosError) { // axios error
            const config = error.config;
            const response = error.response;
            if (config) {
                console.error(`[${getUTCDate()}] [OPENAI] Request method: ${config.method}, url: ${config.url}, data: ${config.data}`);
            }
            if (response) {
                console.error(`[${getUTCDate()}] [OPENAI] AxiosError occurred - code: ${error.code}, status: ${response.status}, statusText: ${response.statusText}`);
                res.status(500).send({ error: `Error while processing the request - ${response.statusText}` });
            } else {
                console.error(`[${getUTCDate()}] [OPENAI] No response from the server - code: ${error.code}`);
                res.status(500).send({ error: "No response from the server" });
            }
        } else if (error instanceof Error) { // common error
            console.error(`[${getUTCDate()}] [OPENAI] Generic error occurred - ${error.message}`);
            res.status(500).send({ error: `An error occurred: ${error.message}` });
        } else { // known error
            console.error(`[${getUTCDate()}] [OPENAI] Unknown error occurred`);
            res.status(500).send({ error: "An unknown error occurred" });
        }
    }
});


// ======================================
// Export
// ======================================
export { router };