// Get date/time
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
let today = now.getDay();
let currentDay = days[today];

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let currentDate = document.querySelector("#date");
currentDate.innerHTML = `${currentDay}`;

let currentClock = document.querySelector("#time");
currentClock.innerHTML = `${hours}:${minutes}`;

//Form submission
let searchValue = document.querySelector("#city");
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city").value;
  let units = "metric";
  let apiKey = "e52c8c1aa4aa55ffa5e0f4d0066c2fed";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
  searchValue.setAttribute("placeholder", `${city}`);
  document.getElementById("search").reset();
}

let form = document.querySelector("#search");
form.addEventListener("submit", handleSubmit);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#today-temp");
  temperatureElement.innerHTML = `${temperature}˚C`;

  let humid = Math.round(response.data.main.humidity);
  let humidity = document.querySelector(".humidity");
  humidity.innerHTML = `Humidity: ${humid}%`;

  let weatherE = response.data.weather[0].description;
  let eventType = document.querySelector(".weatherDescription");
  eventType.innerHTML = `${weatherE}`;

  let windy = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector(".wind");
  windSpeed.innerHTML = `Wind: ${windy}km/h`;
}
function showTemperatureCurrent(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#today-temp");
  temperatureElement.innerHTML = `${temperature}˚C`;

  let humid = Math.round(response.data.main.humidity);
  let humidity = document.querySelector(".humidity");
  humidity.innerHTML = `Humidity: ${humid}%`;

  let weatherE = response.data.weather[0].description;
  let eventType = document.querySelector(".weatherDescription");
  eventType.innerHTML = `${weatherE}`;

  let windy = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector(".wind");
  windSpeed.innerHTML = `Wind: ${windy}km/h`;

  let currentLocationName = document.querySelector("#city");
  let responseData = response.data.name;
  currentLocationName.setAttribute("placeholder", `${responseData}`);
}

//find current
function currentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "e52c8c1aa4aa55ffa5e0f4d0066c2fed";
  let findLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(findLocation).then(showTemperatureCurrent);
}
function getCurrentPosition(event) {
  event.preventDefault;
  navigator.geolocation.getCurrentPosition(currentPosition);
}

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentPosition);

//For later
//$(document).ready(function() {

//$(".credit-input").on("input",function(){
// var value = $(this).val();

//if (value == "411")
//$(".jp-front").css({backgroundImage:"url(http://www.lowestrates.ca/newcontent/img/creditcards/Gold_Rewards_Card_chip_467x293.png)"});

//else if (value == "311")
//$(".jp-front").css({backgroundImage:"url(https://www.bmo.com/img/main/credit-cards/large/rewards-card.jpg)"});

//})

//})
