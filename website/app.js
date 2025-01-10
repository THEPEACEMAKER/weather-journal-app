/* Global Variables */
const baseURL = "https://api.openweathermap.org/data/2.5/weather";
// Personal API Key for OpenWeatherMap API
const apiKey = "967798b5906d6ceb95a892ac3f258d9f&units=imperial"; // units=imperial for Fahrenheit

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

// Async function to fetch weather data
const getWeatherData = async (baseURL, zip, apiKey) => {
  const url = `${baseURL}?zip=${zip}&appid=${apiKey}`;
  try {
    const response = await fetch(url); // Await the fetch request to get weather data
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json(); // await the incoming data, then convert them to JSON
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};

// Async function to POST data to the server
const postData = async (url = "", data = {}) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // Convert data to JSON string and send in the body
    });
    return await response.json(); // await the incoming response, then Parse it as JSON
  } catch (error) {
    console.error("Error posting data:", error);
  }
};

// Async function to get data from the server
const getData = async (url = "") => {
  try {
    const response = await fetch(url); // Await the fetch request to get data from the server
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Function to update the UI with the fetched data
const updateUI = (data) => {
  document.getElementById("date").innerHTML = `Date: ${data.date}`;
  document.getElementById(
    "temp"
  ).innerHTML = `Temperature: ${data.temperature}°F`;
  document.getElementById(
    "content"
  ).innerHTML = `Feeling: ${data.userResponse}`;
};

// Event listener for the Generate button
document.getElementById("generate").addEventListener("click", async (event) => {
  event.preventDefault(); // Prevent form submission (page reload)

  // Get user input
  const zip = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;

  if (!zip || !feelings) {
    alert("Please enter both a zip code and your feelings!");
    return;
  }

  // // Fetch weather data and wait for it to finish before continuing
  const weatherData = await getWeatherData(baseURL, zip, apiKey);

  if (weatherData) {
    // Create the data object to send to the server
    const data = {
      temperature: weatherData.main.temp,
      date: newDate,
      userResponse: feelings,
    };

    // Post data to the server and wait for the response
    const postResponse = await postData("/add", data);
    console.log("POST response:", postResponse); // Log the server response

    // Fetch updated data from the server and update the UI
    const updatedData = await getData("/all");
    updateUI(updatedData); // Update the UI with the fetched data
  }
});
