const express = require('express');
const axios = require('axios');
require('dotenv').config();
const { getUTCDate } = require('../../utils/time');


// ======================================
// Settings
// ======================================
const router = express.Router();


// ======================================
// API
// ======================================
router.post('', async (req, res) => {
    const query = req.body.query;
    let model = req.body.model;
    
    if (!query
        || (typeof query !== "string")
        ||  query.trim() === ""
    ) {
        return res.status(400).send({error: "'query' is required"});
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

    } catch (error) {
        console.error(`[${getUTCDate()}] [OPENAI] Error occured - code: ${error.code}, status: ${error.
            response.status}, statusText: ${error.response.statusText}`);
        console.error(`[${getUTCDate()}] [OPENAI] Request - mothod: ${error.config.method}, url: ${error.config.url}, data: ${error.config.data}`);
        // console.error(`[${getUTCDate()}] [OPENAI] ${error}`);
        res.status(500).send( { error: `Error while processing the request - ${error.response.statusText}` });
    }
});


// ======================================
// Export
// ======================================
module.exports = { router };