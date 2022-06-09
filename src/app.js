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

let coord = null;
let units = "metric";

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();

  return days[day];
}
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

//find current
function currentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "e52c8c1aa4aa55ffa5e0f4d0066c2fed";
  let findLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(findLocation).then(showTemperature);
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "e52c8c1aa4aa55ffa5e0f4d0066c2fed";
  let findLocation = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(findLocation).then(displayForecast);
}
function getCurrentPosition(event) {
  event.preventDefault;
  navigator.geolocation.getCurrentPosition(currentPosition);
}

//Show current temp
function showTemperature(response) {
  celsiusTemp = response.data.main.temp;
  celsiusHigh = response.data.main.temp_max;
  celsiusLow = response.data.main.temp_min;

  let temperature = Math.round(celsiusTemp);
  let temperatureElement = document.querySelector("#today-temp");
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
  dailyHigh.innerHTML = `${dailyH}˚ / `;

  let dailyL = Math.round(celsiusLow);
  let dailyLow = document.querySelector("#low");
  dailyLow.innerHTML = ` ${dailyL}˚`;

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
  getForecast(response.data.coord);
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        `</br>
  <div class="tomorrow col"> 
  <img 
                 src="http://openweathermap.org/img/wn/${
                   forecastDay.weather[0].icon
                 }@2x.png" 
                 alt="" 
                 width="42"
                 />
  </br>
  <span id="Day-1">${formatDay(forecastDay.dt)} </span>
  </br><strong class="forecast-max">${Math.round(
    forecastDay.temp.max
  )}</strong>˚ / <span class="forecast-min"> ${Math.round(
          forecastDay.temp.min
        )}</span>˚
        </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function changeTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#today-temp");
  let highElement = document.querySelector("#high");
  let lowElement = document.querySelector("#low");
  let forecastMinTempElement = document.querySelectorAll(".forecast-min");
  let forecastMaxTempElement = document.querySelectorAll(".forecast-max");
  let fahrenheitTemperature = (celsiusTemp * 9) / 5 + 32;
  let fahrenheitHigh = (celsiusHigh * 9) / 5 + 32;
  let fahrenheitLow = (celsiusLow * 9) / 5 + 32;
  if (tempElement.innerHTML.includes("C")) {
    tempElement.innerHTML = `${Math.round(fahrenheitTemperature)}˚F`;
    highElement.innerHTML = `${Math.round(fahrenheitHigh)}˚ /`;
    lowElement.innerHTML = ` ${Math.round(fahrenheitLow)}˚`;
    tempChange.innerHTML = "˚C";
    forecastMinTempElement.forEach(convertMinF);
    forecastMaxTempElement.forEach(convertMaxF);
  } else if (tempElement.innerHTML.includes("F")) {
    tempElement.innerHTML = `${Math.round(celsiusTemp)}˚C`;
    highElement.innerHTML = `${Math.round(celsiusHigh)}˚ /`;
    lowElement.innerHTML = ` ${Math.round(celsiusLow)}˚`;
    tempChange.innerHTML = "˚F";
    forecastMinTempElement.forEach(convertMinC);
    forecastMaxTempElement.forEach(convertMaxC);
  }
}
function convertMinF(item) {
  let currentTemp = item.innerHTML;
  let forecastFahMinTemp = (currentTemp * 9) / 5 + 32;
  item.innerHTML = Math.round(forecastFahMinTemp);
}

function convertMaxF(item) {
  let currentTemp = item.innerHTML;
  let forecastFahMaxTemp = (currentTemp * 9) / 5 + 32;
  item.innerHTML = Math.round(forecastFahMaxTemp);
}
function convertMinC(item) {
  let currentTemp = item.innerHTML;
  let returnCelMinTemp = ((currentTemp - 32) * 5) / 9;
  item.innerHTML = Math.round(returnCelMinTemp);
}
function convertMaxC(item) {
  let currentTemp = item.innerHTML;
  let returnCelMaxTemp = ((currentTemp - 32) * 5) / 9;
  item.innerHTML = Math.round(returnCelMaxTemp);
}

let tempChange = document.querySelector("#temp-button");
tempChange.addEventListener("click", changeTemp);

let celsiusTemp = null;
let celsiusHigh = null;
let celsiusLow = null;

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentPosition);

search("Barcelona");
