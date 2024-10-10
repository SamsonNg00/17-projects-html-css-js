const apiKey = "b60e24e0631cd856762d07f11add02ed";
const getWeatherBtn = document.getElementById("get-weather-btn");
const getLocationBtn = document.getElementById("get-location-btn");
const getUnitToggle = document.getElementById("unit-toggle");
const cityInput = document.getElementById("city-input");
const weatherCity = document.getElementById("weather-city");
const weatherTemp = document.getElementById("weather-temp");
const weatherDescription = document.getElementById("weather-description");
const weatherIcon = document.getElementById("weather-icon");
const loading = document.getElementById("loading");

let units = "metric"; //Default to Celsius

getUnitToggle.addEventListener("click", function () {
  if (units === "metric") {
    units = "imperial"; //Switch to Fahrenheit
    this.innerText = "Switch to Celsius";
  } else {
    units = "metric"; // Switch back to Celsius
    this.innerText = "Switch to Fahrenheit";
  }
});

// Event Listener For manual city input
getWeatherBtn.addEventListener("click", function () {
  const city = cityInput.value;
  if (city === "") return;

  // Show loading indicator
  loading.style.display = "block";
  fetchWeatherData(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  );
});

getLocationBtn.addEventListener("click", function () {
  if (navigator.geolocation) {
    loading.style.display = "block"; // Showing loading indicator
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        //Fetch weather using latitude and longtitude
        fetchWeatherData(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
        );
      },
      () => {
        alert("Location access was denied. Please enter your city manually.");
        loading.style.display = "none"; // Hide loading if there is an error
      }
    );
  } else {
    alert("Geolocation is not supported by your browser.");
  }
});

// Function to fetch weather data and update UI
function fetchWeatherData(url) {
  //Fetch weather data with dynamic units (metric/imperial)
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const unitSymbol = units === "metric" ? "°C" : "°F"; // Adjust unit symbol

      // Hide loading indicator after data is received
      loading.style.display = "none";

      //Display And Update weather information
      weatherCity.innerText = `Weather in ${data.name}`;
      weatherTemp.innerText = `Temperature: ${data.main.temp}${unitSymbol}`;
      weatherDescription.innerText = `Conditions: ${data.weather[0].description}`;

      // Set the weather icon and make it visible
      const iconCode = data.weather[0].icon;
      const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
      weatherIcon.src = iconUrl;
      weatherIcon.style.display = "block"; // Make the icon visible

      // New Details: humidity, wind speed, and feels-like temperature
      const humidity = document.createElement("p");
      humidity.innerHTML = `Humidity: ${data.main.humidity}%`;

      const windspeed = document.createElement("p");
      windspeed.innerText = `Wind Speed: ${data.wind.speed} ${
        units === "metric" ? "m/s" : "mph"
      }`;

      const feelsLike = document.createElement("p");
      feelsLike.innerText = `Feels Like: ${data.main.feels_like}${unitSymbol}`;

      weatherDescription.appendChild(humidity);
      weatherDescription.appendChild(windspeed);
      weatherDescription.appendChild(feelsLike);
    })
    .catch((error) => {
      // Hide loadind indicator in case of an error
      loading.style.display = "none";

      // Handle error
      weatherCity.innerText = "City not found.Please try again.";
      weatherTemp.innerText = "";
      weatherDescription.innerText = "";
      weatherIcon.style.display = "none"; // Hide the icon if there's an error
    });
}

window.addEventListener("load", function () {
  if (navigator.geolocation) {
    loading.style.display = "block"; // Show laoding indicator
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Fecth weather using latitude and longitude
        fetchWeatherData(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
        );
      },
      () => {
        alert(
          "Geolocation permission denied. Please enter your city manually."
        );
        loading.style.display = "none";
      }
    );
  }
});
