function changeCurrentTime() {
  let now = new Date();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentDay = days[now.getDay()];
  let currentHour = now.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinutes = now.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  let time = document.querySelector(".date");
  return (time.innerHTML = `${currentDay} ${currentHour}:${currentMinutes}`);
}
changeCurrentTime();

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
  newCity.innerHTML = response.data.name;
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(response.data.main.temp);
  let feelTemperature = document.querySelector(".feels-like");
  feelTemperature.innerHTML = Math.round(response.data.main.feels_like);
  let windSpeed = document.querySelector(".wind-speed");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  let pressure = document.querySelector(".pressure");
  pressure.innerHTML = Math.round(response.data.main.pressure);
  console.log(response.data);
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
