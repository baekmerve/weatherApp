const BASE_URL =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const iconBaseUrl = "https://openweathermap.org/img/wn/";

//? DOM_ELEMENTS

const DOM_ELEMENTS = {
  cityName: document.querySelector(".city"),
  temperature: document.querySelector(".temp"),
  humidity: document.querySelector(".humidity"),
  wind: document.querySelector(".wind"),
  searchBox: document.querySelector("#searchBox"),
  searchButton: document.querySelector("#searchButton"),
  weatherIcon: document.querySelector(".weather-icon"),
  weatherStat: document.querySelector(".weather-stat"),
};

async function checkWeather(city) {
  try {
    const response = await fetch(`${BASE_URL}${city}&appid=${API_KEY}`);

    if (!response.ok) throw new Error("City not found");

    const data = await response.json();

    updateWeatherInfo(data);
  } catch (error) {
    console.error(error);
  }
}

function updateWeatherInfo(data) {
  //?  Update weather details
  DOM_ELEMENTS.cityName.innerHTML = data.name;
  DOM_ELEMENTS.temperature.innerHTML = `${Math.round(data.main.temp)}°C`;
  DOM_ELEMENTS.humidity.innerHTML = `${data.main.humidity}%`;
  DOM_ELEMENTS.wind.innerHTML = `${data.wind.speed} km/h`;
  DOM_ELEMENTS.weatherStat.innerHTML = data.weather[0].description;

  //? Update weather icon
  const iconCode = data.weather[0].icon;
  DOM_ELEMENTS.weatherIcon.innerHTML = `<img src="${iconBaseUrl}${iconCode}@2x.png" alt="${data.weather[0].description}">`;
}

//? event listener for click event
DOM_ELEMENTS.searchButton.addEventListener("click", () => {
  const city = DOM_ELEMENTS.searchBox.value.trim();
  if (city) {
    checkWeather(city);
  } else {
    alert("Please enter a city name.");
  }
});
