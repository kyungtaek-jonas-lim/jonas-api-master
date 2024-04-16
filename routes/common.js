// -------------------------------
// Init
// -------------------------------
const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

// -------------------------------
// Route
// -------------------------------
router.post(["/test"], asyncHandler ( async (req, res) => {
    res.status(200).send("Success");
}));

// -------------------------------
// Module Exports
// -------------------------------
module.exports = router;