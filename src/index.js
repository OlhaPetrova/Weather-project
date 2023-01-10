function changeCurrentTime(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}


function showCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#city-name");
  let newCity = document.querySelector(".own-City");
  newCity.innerHTML = `${inputCity.value}`;
  let apiKey = "a33b693cfbefd271b0ed075f9a8f65f0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}
let searchButton = document.querySelector(".btn-primary");
searchButton.addEventListener("click", showCity);

function displayWeatherCondition(response) {
  let newCity = document.querySelector(".own-City");
  let temperature = document.querySelector("#temperature");
  let feelTemperature = document.querySelector(".feels-like");
  let windSpeed = document.querySelector(".wind-speed");
  let pressure = document.querySelector(".pressure");
  let iconElement = document.querySelector("#icon");
   let dateElement = document.querySelector("#date");

  pressure.innerHTML = Math.round(response.data.main.pressure);
  newCity.innerHTML = response.data.name;
  temperature.innerHTML = Math.round(response.data.main.temp);
  feelTemperature.innerHTML = Math.round(response.data.main.feels_like);
  dateElement.innerHTML = changeCurrentTime(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}
function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "a33b693cfbefd271b0ed075f9a8f65f0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let locationButton = document.querySelector("#current-loc");
locationButton.addEventListener("click", getCurrentLocation);
