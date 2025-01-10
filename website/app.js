/* Global Variables */
const baseURL = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = "967798b5906d6ceb95a892ac3f258d9f";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

// Async function to fetch weather data
const getWeatherData = async (baseURL, zip, apiKey) => {
  const url = `${baseURL}?zip=${zip}&appid=${apiKey}&units=imperial`; // units=imperial for Fahrenheit
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
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

  // Fetch weather data
  const weatherData = await getWeatherData(baseURL, zip, apiKey);

  // Log the weather data and user feelings
  console.log(weatherData);
  console.log("User's feelings: ", feelings);
});
