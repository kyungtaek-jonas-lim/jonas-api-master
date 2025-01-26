import express, { Request, Response, Router } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import { getUTCDate } from '../../utils/time';

dotenv.config();

// ======================================
// Settings
// ======================================
const router: Router = express.Router();


// ======================================
// API
// ======================================
router.post('', async (req: Request, res: Response) => {
    const query = req.body.query;
    
    if (!query) {
        res.status(400).send({error: "'query' is required"});
        return;
    }

    console.log(`[${getUTCDate()}] [GPT2] request data - query: ${query}`);
    try {
        const response = await axios.post(
            'https://api-inference.huggingface.co/models/gpt2',
            {
                inputs: query,
                temperature: 0.5, // Controls the randomness of the output (higher = more random)
                max_length: 100, // Maximum length of the output text
                top_p: 0.85, // Nucleus sampling parameter, controls diversity
                top_k: 40 // Limits the number of highest probability tokens to consider
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        const reply = response.data[0].generated_text;
        res.json({ reply: reply });
        console.log(`[${getUTCDate()}] [GPT2] response data - reply: ${reply}`);
    } catch (error) {
        console.error(error);
        res.status(500).send( { error: 'Error while processing the request' });
    }
});


// ======================================
// Export
// ======================================
export { router };