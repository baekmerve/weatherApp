const BASE_URL =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const iconBaseUrl = "https://openweathermap.org/img/wn/";

//? DOM_ELEMENTS
const DOM_ELEMENTS = {
  cityName: document.querySelector(".city"),
  temperature: document.querySelector(".temp"),
  feelsLike: document.querySelector(".feelsLike"),

  humidity: document.querySelector(".humidity"),
  wind: document.querySelector(".wind"),
  pressure: document.querySelector(".pressure"),
  searchBox: document.querySelector("#searchBox"),
  searchButton: document.querySelector("#searchButton"),
  weatherIcon: document.querySelector(".weather-icon"),
  errorMessage: document.querySelector(".error"),
  weather: document.querySelector(".weather"),
  body: document.querySelector(".card"),
};

//function for: checkWeather
async function checkWeather(city) {
  try {
    const response = await fetch(`${BASE_URL}${city}&appid=${API_KEY}`);
    //? if the city if not valid, show the error on the screen
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

//function for: updateWeatherInfo
function updateWeatherInfo(data) {
  //?  Update weather details
  DOM_ELEMENTS.cityName.innerHTML = data.name;
  DOM_ELEMENTS.temperature.innerHTML = `${Math.round(data.main.temp)}°`;
  DOM_ELEMENTS.feelsLike.innerHTML = `feels like ${Math.ceil(
    data.main.feels_like
  )}°C`;
  DOM_ELEMENTS.humidity.innerHTML = `${data.main.humidity}%`;
  DOM_ELEMENTS.wind.innerHTML = `${Math.round(data.wind.speed)} km/h`;
  DOM_ELEMENTS.pressure.innerHTML = `${data.main.pressure} hPa`;
  const iconCode = data.weather[0].icon;
  const weatherCondition = data.weather[0].main;

  //? Update weather icon
  DOM_ELEMENTS.weatherIcon.innerHTML = `<img src="${iconBaseUrl}${iconCode}@2x.png" alt="${data.weather[0].description}">`;

  updateBackground(weatherCondition);
}

//function for: Update bg color depends on weatherCondition
function updateBackground(weatherCondition) {
  switch (weatherCondition) {
    case "Clear":
      DOM_ELEMENTS.body.style.backgroundColor = "#87CEEB"; // Sky blue
      break;
    case "Clouds":
      DOM_ELEMENTS.body.style.backgroundColor = "#B0C4DE"; // Light steel blue
      break;
    case "Rain":
      DOM_ELEMENTS.body.style.backgroundColor = "#708090"; // Slate gray
      break;
    case "Snow":
      DOM_ELEMENTS.body.style.backgroundColor = "#F0F8FF"; // Alice blue
      break;
    case "Mist":
      DOM_ELEMENTS.body.style.backgroundColor = "#BDC3C7"; // Light gray
      break;
    case "Wind":
      DOM_ELEMENTS.body.style.backgroundColor = "#5DADE2"; // Light blue
      break;
  }
}

//? event listener for the search button click
DOM_ELEMENTS.searchButton.addEventListener("click", () => {
  const city = DOM_ELEMENTS.searchBox.value.trim();

  if (city) {
    checkWeather(city);
  } else {
    alert("Please enter a city name.");
  }
});

//? event listener for pressing the Enter key in the search box
DOM_ELEMENTS.searchBox.addEventListener("keypress", (event) => {
  // first check if the key pressed is Enter
  if (event.key === "Enter") {
    const city = DOM_ELEMENTS.searchBox.value.trim();
    if (city) {
      checkWeather(city);
    } else {
      alert("Please enter a city name.");
    }
  }
});
