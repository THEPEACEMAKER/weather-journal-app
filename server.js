// Setup empty JS object to act as endpoint for all routes
let projectData = {
  temperature: null,
  date: null,
  userResponse: null,
};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
// this used to be done with body-parser middleware, but it got integrated into the express framework itself
// Parse incoming requests with JSON payloads
app.use(express.json());
// Parse incoming requests with URL-encoded payloads (typically from HTML form submissions)
// This middleware converts data from the URL-encoded format (e.g., "key=value&key2=value2") into a JavaScript object
app.use(express.urlencoded({ extended: false }));

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website")); // the root folder served when the server URL is accessed

// GET route to send projectData
app.get("/all", (req, res) => {
  res.send(projectData);
});

// POST route to add data to projectData
app.post("/add", (req, res) => {
  const { temperature, date, userResponse } = req.body;
  projectData = {
    temperature: temperature,
    date: date,
    userResponse: userResponse,
  };
  res.send({ message: "Data added successfully!" });
});

// Setup Server
const port = 3000;
const server = app.listen(port, () => {
  console.log(`Server running on localhost:${port}`);
});
