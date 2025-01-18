const cityInput = document.getElementById("city-input");
const getWeather = document.getElementById("get-weather-btn");
const displayCityName = document.getElementById("city-name");
const displayDateTime = document.getElementById("data-time");
const displayTemprature = document.getElementById("temprature");
const displayDescription = document.getElementById("description");
const displayWeatherInfo = document.querySelector(".weather-info");
const displayErrorMessage = document.getElementById("error-message");
const APIKey = `03c4af9126ac892f82b9ab9ea913f4ca`;

getWeather.addEventListener("click", async () => {
  const cityName = cityInput.value.trim();
  if (!cityName) return;

  const weatherInfo = await fetchData(cityName);
  console.log(weatherInfo);
});

async function fetchData(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      displayWeatherDetails(data);
    } else {
      throw new Error(`Response status: ${response.status}`);
    }
  } catch (err) {
    displayWeatherInfo.classList.add("hidden");
    displayErrorMessage.classList.remove("hidden");
  }
}

function displayWeatherDetails(data) {
  const { main, name, weather } = data;
  displayCityName.innerText = name;
  displayDateTime.innerText = new Date().toLocaleString();
  displayTemprature.innerText = `Temperature: ${main.temp}`;
  displayDescription.innerText = `Description: ${weather[0].description}`;
  displayWeatherInfo.classList.remove("hidden");
  displayErrorMessage.classList.add("hidden");
}
