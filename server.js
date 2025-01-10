// Setup empty JS object to act as endpoint for all routes
let projectData = { good: "great" };

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
