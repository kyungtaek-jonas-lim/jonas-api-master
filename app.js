const express = require('express');
const { router: aiRouter } = require('./routes/ai')
require('dotenv').config();


// ====================================
// Settings
// ====================================
const app = express(); // Express
const PORT = process.env.PORT || 3000; // Port
app.use(express.json()); // Parse JSON request data to req.body automatically


// ====================================
// Routers
// ====================================
app.use('/ai', aiRouter);


// ====================================
// Listen
// ====================================
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});