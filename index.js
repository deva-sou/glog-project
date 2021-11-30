// index.js

/**
 * Required External Modules
 */
const express = require("express");
const path = require("path");

// /**
//  * App Variables
//  */
const app = express();
const port = process.env.PORT || "8000";
require('dotenv').config();


// /**
//  *  App Configuration
//  */

// /**
//  * Routes Definitions
//  */

// /**
//  * Server Activation
//  */
app.use(express.static(path.join(__dirname, 'app')));

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});