const fetch = require("node-fetch");

exports.handler = async function (event) {
  const { city } = event.queryStringParameters;

  if (!city) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "City is required" }),
    };
  }

  const API_KEY = process.env.API_KEY; 
  const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

  try {
    const response = await fetch(
      `${BASE_URL}?units=metric&q=${city}&appid=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
