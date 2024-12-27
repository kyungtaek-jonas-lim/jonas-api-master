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
    
    if (!query) {
        return res.status(400).send({error: "'query' is required"});
    }

    console.log(`[${getUTCDate()}] [GPT2] request data - query: ${query}`);

    try {
        const response = await axios.post(
            'https://api-inference.huggingface.co/models/gpt2',
            {
                inputs: query,
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
module.exports = { router };