// -------------------------------
// Init
// -------------------------------
// express object
const express = require("express");

// execute express
const app = express();

// ejs layout module
const expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts);

// ejs template engine
app.set("view engine", "ejs");
app.set("views", "./views");

// static resources
app.use(express.static("./public"));

// request body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie Parser
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// method-override
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

// -------------------------------
// Route
// -------------------------------
app.use("/common", require("./routes/common"));


// -------------------------------
// Run
// -------------------------------
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});