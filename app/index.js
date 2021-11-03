// index.js

/**
 * Required External Modules
 */
const express = require("express");
const path = require("path");

/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || "8000";

/**
 *  App Configuration
 */

/**
 * Routes Definitions
 */

app.get("/", (req, res) => {
  res.status(200).send("Hi team this is our v0 project for gLog");
});
app.get("/index", (req, res) => {
  res.status(200).sendFile("/Users/devasou/code/deva-sou/glog-project/app/views/index.html");
});
/**
 * Server Activation
 */

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
