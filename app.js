const BASE_URL =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const iconBaseUrl = "https://openweathermap.org/img/wn/";

//? DOM_ELEMENTS
const DOM_ELEMENTS = {
  cityName: document.querySelector(".city"),
  temperature: document.querySelector(".temp"),
  description: document.querySelector(".description"),
  humidity: document.querySelector(".humidity"),
  wind: document.querySelector(".wind"),
  pressure: document.querySelector(".pressure"),
  searchBox: document.querySelector("#searchBox"),
  searchButton: document.querySelector("#searchButton"),
  weatherIcon: document.querySelector(".weather-icon"),
  errorMessage: document.querySelector(".error"),
  weather: document.querySelector(".weather"),
};

async function checkWeather(city) {
  try {
    const response = await fetch(`${BASE_URL}${city}&appid=${API_KEY}`);
    // if the city if not valid, show the error on the screen
    if (response.status === 404) {
      DOM_ELEMENTS.errorMessage.style.display = "block";
      DOM_ELEMENTS.weather.style.display = "none";
    } else {
      const data = await response.json();
      console.log(data);
      updateWeatherInfo(data);
    }
  } catch (error) {
    console.log(error);
  }
}

function updateWeatherInfo(data) {
  //?  Update weather details
  DOM_ELEMENTS.cityName.innerHTML = data.name;
  DOM_ELEMENTS.temperature.innerHTML = `${Math.round(data.main.temp)}°`;
   DOM_ELEMENTS.description.innerHTML = `${data.weather[0].description}`;
  DOM_ELEMENTS.humidity.innerHTML = `${data.main.humidity}%`;
  DOM_ELEMENTS.wind.innerHTML = `${Math.round(data.wind.speed)} km/h`;
   DOM_ELEMENTS.pressure.innerHTML = `${data.main.pressure} hPa`;
  const iconCode = data.weather[0].icon;

  //? Update weather icon
  if (data.weather[0].main === "Clouds") {
    DOM_ELEMENTS.weatherIcon.innerHTML = '<img src="images/clouds.png"></img>';
  } else if (data.weather[0].main === "Clear") {
    DOM_ELEMENTS.weatherIcon.innerHTML = '<img src="images/clear.png"></img>';
  } else if (data.weather[0].main === "Rain") {
    DOM_ELEMENTS.weatherIcon.innerHTML = '<img src="images/rain.png"></img>';
  } else if (data.weather[0].main === "Drizzle") {
    DOM_ELEMENTS.weatherIcon.innerHTML = '<img src="images/drizzle.png"></img>';
  } else if (data.weather[0].main === "Mist") {
    DOM_ELEMENTS.weatherIcon.innerHTML = '<img src="images/mist.png"></img>';
  } else {
    DOM_ELEMENTS.weatherIcon.innerHTML = `<img src="${iconBaseUrl}${iconCode}@2x.png" alt="${data.weather[0].description}">`;
  }
}

//? event listener for click (search) event
DOM_ELEMENTS.searchButton.addEventListener("click", () => {
  const city = DOM_ELEMENTS.searchBox.value.trim();

  if (city) {
    checkWeather(city);
  } else {
    alert("Please enter a city name.");
  }
});
