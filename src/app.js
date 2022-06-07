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
function search(city) {
  let units = "metric";
  let apiKey = "e52c8c1aa4aa55ffa5e0f4d0066c2fed";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city");
  search(cityInput.value);
  cityInput.value.setAttribute("placeholder", `${cityInput}`);
  document.getElementById("search").reset();
}

let form = document.querySelector("#search");
form.addEventListener("submit", handleSubmit);

//Show current temp
function showTemperature(response) {
  celsiusTemp = response.data.main.temp;
  celsiusHigh = response.data.main.temp_max;
  celsiusLow = response.data.main.temp_min;

  let temperature = Math.round(celsiusTemp);
  let temperatureElement = document.querySelector("#today-temp");
  let iconElement = document.querySelector(".icon");
  temperatureElement.innerHTML = `${temperature}˚C`;

  let humid = Math.round(response.data.main.humidity);
  let humidity = document.querySelector(".humidity");
  humidity.innerHTML = `Humidity: ${humid}%`;

  let weatherE = response.data.weather[0].description;
  let eventType = document.querySelector("#description");
  eventType.innerHTML = `${weatherE}`;

  let windy = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector(".wind");
  windSpeed.innerHTML = `Wind: ${windy}km/h`;

  let dailyH = Math.round(celsiusHigh);
  let dailyHigh = document.querySelector("#high");
  dailyHigh.innerHTML = `${dailyH}˚C / `;

  let dailyL = Math.round(celsiusLow);
  let dailyLow = document.querySelector("#low");
  dailyLow.innerHTML = ` ${dailyL}˚C`;

  let currentLocationName = document.querySelector("#city");
  let responseData = response.data.name;
  currentLocationName.setAttribute("placeholder", `${responseData}`);
  document.getElementById("search").reset();

  //Background change
  let backgroundVideo = document.getElementById("video");
  let description = response.data.weather[0];
  if (description["description"].includes("cloud")) {
    backgroundVideo.setAttribute("src", "images/Cloud timelapse.mp4");
  } else if (description["description"].includes("snow")) {
    backgroundVideo.setAttribute("src", "images/Snow falling by the trees.mp4");
  } else if (description["description"].includes("clear")) {
    backgroundVideo.setAttribute("src", "images/Sun over bay.mp4");
  } else if (description["description"].includes("drizzle")) {
    backgroundVideo.setAttribute(
      "src",
      "images/Rain falling on windshield.mp4"
    );
  } else if (description["description"].includes("rain")) {
    backgroundVideo.setAttribute(
      "src",
      "images/Rain falling on windshield.mp4"
    );
  } else if (description["description"].includes("mist")) {
    backgroundVideo.setAttribute(
      "src",
      "images/Misty mountains in Salta, Argentina.mp4"
    );
  } else if (description["description"].includes("storm")) {
    backgroundVideo.setAttribute("src", "images/Lightning Bolt at Night.mp4");
  }
}
//find current
function currentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "e52c8c1aa4aa55ffa5e0f4d0066c2fed";
  let findLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(findLocation).then(showTemperature);
  axios.get(findLocation).then(displayForecast);
}
function getCurrentPosition(event) {
  event.preventDefault;
  navigator.geolocation.getCurrentPosition(currentPosition);
}

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentPosition);

search("Barcelona");

function changeTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#today-temp");
  let highElement = document.querySelector("#high");
  let lowElement = document.querySelector("#low");
  let fahrenheitTemperature = (celsiusTemp * 9) / 5 + 32;
  let fahrenheitHigh = (celsiusHigh * 9) / 5 + 32;
  let fahrenheitLow = (celsiusLow * 9) / 5 + 32;
  if (tempElement.innerHTML.includes("C")) {
    tempElement.innerHTML = `${Math.round(fahrenheitTemperature)}˚F`;
    highElement.innerHTML = `${Math.round(fahrenheitHigh)}˚F /`;
    lowElement.innerHTML = `${Math.round(fahrenheitLow)}˚F`;
    tempChange.innerHTML = "˚C";
  } else if (tempElement.innerHTML.includes("F")) {
    tempElement.innerHTML = `${Math.round(celsiusTemp)}˚C`;
    highElement.innerHTML = `${Math.round(celsiusHigh)}˚C /`;
    lowElement.innerHTML = `${Math.round(celsiusLow)}˚C`;
    tempChange.innerHTML = "˚F";
  }
}

let tempChange = document.querySelector("#temp-button");
tempChange.addEventListener("click", changeTemp);

let celsiusTemp = null;
let celsiusHigh = null;
let celsiusLow = null;

function displayForecast(response) {
  let forecastElement = document.querySelector(".forecast");
  forecastElement.innerHTML = "Forecast";
  let forecastHTML = `<div class="forecast row">`;
  let days = ["Thursday", "Friday", "Saturday"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `         
  </br>
  <div class="tomorrow col"> 
  <i class="icon fa-solid fa-cloud-sun"></i> 
  </br>
  <span id="Day-1">${day} </span>
  </br><strong>24˚C </strong> / 17˚C</div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

displayForecast();
//Forecast
// iconElement.setAttribute(
// "src",
//`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
//);
//iconElement.setAttribute("alt", response.data.weather[0].description);
