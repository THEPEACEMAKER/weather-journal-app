/* Global Variables */
const baseURL = "https://api.openweathermap.org/data/2.5/weather";
// Personal API Key for OpenWeatherMap API
const apiKey = "967798b5906d6ceb95a892ac3f258d9f&units=imperial"; // units=imperial for Fahrenheit

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

// Function to fetch weather data
const fetchWeatherData = (baseURL, zip, apiKey) => {
  const url = `${baseURL}?zip=${zip}&appid=${apiKey}`;
  return fetch(url) // Return the fetch promise
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json(); // Return the JSON response
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
};

// Function to POST data to the server
const postDataToServer = (url = "", data = {}) => {
  return fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // Convert data to JSON string and send in the body
  })
    .then((response) => response.json()) // Return the JSON response
    .catch((error) => {
      console.error("Error posting data:", error);
    });
};

// Function to get data from the server
const fetchDataFromServer = (url = "") => {
  return fetch(url) // Return the fetch promise
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json(); // Return the JSON response
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};

// Function to update the UI with the fetched data
const updateUIWithData = (data) => {
  document.getElementById("date").innerHTML = `Date: ${data.date}`;
  document.getElementById(
    "temp"
  ).innerHTML = `Temperature: ${data.temperature}°F`;
  document.getElementById(
    "content"
  ).innerHTML = `Feeling: ${data.userResponse}`;
};

// Event listener for the Generate button
const onGenerateButtonClick = (event) => {
  event.preventDefault(); // Prevent form submission (page reload)

  // Get user input
  const zip = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;

  if (!zip || !feelings) {
    alert("Please enter both a zip code and your feelings!");
    return;
  }

  // Fetch weather data, post data to the server, and update the UI
  fetchWeatherData(baseURL, zip, apiKey)
    .then((weatherData) => {
      if (weatherData) {
        // Create the data object to send to the server
        const data = {
          temperature: weatherData.main.temp,
          date: newDate,
          userResponse: feelings,
        };

        // Post data to the server
        return postDataToServer("/add", data); // Return the promise for chaining
      }
    })
    .then((postResponse) => {
      console.log("POST response:", postResponse); // Log the server response
      // Fetch updated data from the server and update the UI
      return fetchDataFromServer("/all"); // Return the promise for chaining
    })
    .then((updatedData) => {
      updateUIWithData(updatedData); // Update the UI with the fetched data
    })
    .catch((error) => {
      console.error("Error in the process:", error);
    });
};

document
  .getElementById("generate")
  .addEventListener("click", onGenerateButtonClick);
