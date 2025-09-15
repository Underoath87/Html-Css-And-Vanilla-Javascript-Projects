'use strict';

// DOM elements
const elements = {
  form: document.getElementById('search-form'),
  input: document.getElementById('city-input'),
  locateBtn: document.getElementById('locate-btn'),
  message: document.getElementById('message'),
  card: document.getElementById('result'),
  placeName: document.getElementById('place-name'),
  placeCountry: document.getElementById('place-country'),
  weatherEmoji: document.getElementById('weather-emoji'),
  temperature: document.getElementById('temperature'),
  condition: document.getElementById('condition'),
  apparent: document.getElementById('apparent'),
  humidity: document.getElementById('humidity'),
  wind: document.getElementById('wind'),
  forecastGrid: document.getElementById('forecast'),
  unitButtons: document.querySelectorAll('.unit-btn'),
};

// GLOBAL STATE
let currentWeatherData = null;
let currentLocationData = null;

// Convert weather code to emoji
const codeToEmoji = (code, isNight) => {
  const weatherEmojis = {
    0: isNight ? '🌙' : '☀️',
    1: '⛅',
    2: '⛅',
    3: '☁️',
    45: '🌫️',
    48: '🌫️',
    51: '🌦️',
    53: '🌦️',
    55: '🌦️',
    56: '🌦️',
    57: '🌦️',
    61: '🌧️',
    63: '🌧️',
    65: '🌧️',
    66: '🌧️',
    67: '🌧️',
    71: '❄️',
    73: '❄️',
    75: '❄️',
    77: '❄️',
    80: '🌧️',
    81: '🌧️',
    82: '🌧️',
    85: '🌨️',
    86: '🌨️',
    95: '⛈️',
    96: '🌩️',
    97: '🌩️',
    99: '🌩️',
  };
  return weatherEmojis[code] || '⛅';
};

// Get weather description from code
const descriptionFromCode = (code) => {
  const descriptions = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    56: 'Light freezing drizzle',
    57: 'Dense freezing drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    66: 'Light freezing rain',
    67: 'Heavy freezing rain',
    71: 'Slight snow',
    73: 'Moderate snow',
    75: 'Heavy snow',
    77: 'Snow grains',
    80: 'Rain showers: slight',
    81: 'Rain showers: moderate',
    82: 'Rain showers: violent',
    85: 'Snow showers: slight',
    86: 'Snow showers: heavy',
    95: 'Thunderstorm',
    96: 'Thunderstorm with slight hail',
    97: 'Thunderstorm with heavy hail',
    99: 'Thunderstorm with heavy hail',
  };
  return descriptions[code] || 'Weather';
};

//HELPER FUNCTIONS
const mpsToKmh = (mps) => Math.round(mps * 3.6); // conver mps to km/h
const celsiusToFahrenheit = (celsius) => Math.round((celsius * 9) / 5 + 32); // convert celsius to fahrenheit

//toggle celsius and fahrenheit button if it exist return dataset.unit if not found return celsius as default value;
const getCurrentUnit = function () {
  const activeBtn = document.querySelector('.unit-btn.active');
  return activeBtn?.dataset.unit || 'celsius';
};

//if the active button is fahrenheit, convert it to celsius if its false just round up only the celsius
const formatTemperature = function (celsius) {
  return getCurrentUnit() === 'fahrenheit'
    ? celsiusToFahrenheit(celsius)
    : Math.round(celsius);
};

// if active button exist return either °F or °C
const getUnitSymbol = function () {
  return getCurrentUnit() === 'fahrenheit' ? '°F' : '°C';
};

//show message to the user
const showMessage = function (text, type = 'success') {
  elements.message.textContent = text;
  elements.message.className = `message ${type}`;
};

//API FUNCTIONS
const geoCodeCity = async function (city) {
  // store api to url  variables used encodeURIComponent to remove spaces or add something eg. New York -> New%York
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    city
  )}&count=1&language=en&format=json`;

  const response = await fetch(url); //fetching url with await

  if (!response.ok) throw new Error(`Network error while searching location`); // if status 400 throw error

  const data = await response.json(); //storing data
  if (!data.results?.length) throw new Error(`City not found`); // if there is no  data throw error

  return data.results[0]; // return results if results exist
};

const fetchWeather = async function (lat, long, timezone = 'auto') {
  // store api to url variables set the value of latitude and longitude dynamically
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,apparent_temperature,is_day,weather_code,relative_humidity_2m,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=${encodeURIComponent(
    timezone
  )}&forecast_days=7`;

  const response = await fetch(url); //fetching url with await

  if (!response.ok) throw new Error(`network error while fetching weather`); // if response.status 400 api is not working

  return response.json(); // return data
};

// INPUT CITY NAME TO SEARCH FOR A WEATHER
const searchByCity = async function (city) {
  try {
    showMessage('Looking up city...', 'success');
    const location = await geoCodeCity(city);
    showMessage('Fetching weather...', 'success');
    const weather = await fetchWeather(
      location.latitude,
      location.longitude,
      location.timezone
    );
    renderWeather(location, weather);
    showMessage('Here is your weather');
  } catch (error) {
    showMessage(error.message || 'Something went wrong', 'error');
  }
};

// UPDATE UI WITH WEATHER DATA
const renderWeather = function (location, weather) {
  // if (!weather || !weather.current) {
  //   console.error('⚠️ Missing current data:', weather);
  //   return;
  // }

  // store data for unit conversion
  currentWeatherData = weather;
  currentLocationData = location;

  console.log(currentWeatherData, currentLocationData);

  // take out current object from weather json
  const { current } = weather;
  const isNight = current.is_day === 0; // if the current.is_day is 0 return night if 1 above return day

  console.log(current);

  // update main weather display int he UI
  elements.placeName.textContent = location.name;
  elements.placeCountry.textContent = location.country_code
    ? `, ${location.country_code}` // if there is country return, if there's no return empty
    : '';
  elements.weatherEmoji.textContent = codeToEmoji(
    current.weather_code,
    isNight
  );
  elements.temperature.textContent = formatTemperature(current.temperature_2m); // celsius eg. 27
  elements.condition.textContent = descriptionFromCode(current.weather_code);
  elements.apparent.textContent = `${formatTemperature(
    current.apparent_temperature
  )}${getUnitSymbol()}`;
  elements.humidity.textContent = `${current.relative_humidity_2m}%`;
  elements.wind.textContent = `${mpsToKmh(current.wind_speed_10m)}%`;

  const unitElement = document.querySelector('.unit');

  if (unitElement) {
    unitElement.textContent = getUnitSymbol();
  }

  // Render forecast and show card
  renderForecast(weather.daily);

  elements.card.classList.remove('hidden');
};

//RENDER 5 DAY FORECAST
const renderForecast = function (daily) {
  if (!daily.time) {
    elements.forecastGrid.innerHTML = '';
    return;
  }

  const days = [];
  for (let i = 1; i <= 5 && i <= daily.time.length; i++) {
    days.push({
      date: daily.time[i],
      code: daily.weather_code[i],
      tmax: Math.round(daily.temperature_2m_max[i]),
      tmin: Math.round(daily.temperature_2m_min[i]),
    });
  }

  console.log(days);

  // map over the days variables and make container forecast days was inserted in the parent elements which is forecastGrid
  elements.forecastGrid.innerHTML = days
    .map((day) => {
      const date = new Date(day.date);
      const labelDate = date.toLocaleDateString(undefined, {
        weekday: 'short',
      });
      const emoji = codeToEmoji(day.code, false);
      const unit = getUnitSymbol();

      return `
      <div class="forecast-day">
        <div class="forecast-date">${labelDate}</div>
        <div class="forecast-emoji">${emoji}</div>
        <div class="forecast-temp">${formatTemperature(
          day.tmin
        )}° / ${formatTemperature(day.tmax)}${unit}</div>
      </div>
    `;
    })
    .join('');
};

//TODO FOR REVIEW TOMORROW
// SEARCH WEATHER BY CURRENT LOCATION
const searchByLocation = async function () {
  if (!navigator.geolocation) {
    showMessage(`Geolocation is not supported in this device`, 'error');
    return;
  }

  showMessage('Locating you...');

  navigator.geolocation.getCurrentPosition(
    //1st parameter
    async function (position) {
      try {
        const { latitude, longitude } = position.coords;
        const weather = await fetchWeather(latitude, longitude);
        const location = {
          name: 'Your location',
          country_code: '',
          timezone: weather.timezone,
        };
        renderWeather(location, weather);
        showMessage('Here is your local weather');
        console.log(weather);
        console.log(location);
        console.log(position);
      } catch (error) {
        showMessage(
          error.message || 'Could not fetch weather for your location',
          'error'
        );
      }
    },
    //2nd parameter
    function (error) {
      const message =
        error.code === 1
          ? 'Location permission denied'
          : 'Could not get your location';
      showMessage(message, 'error');
    }
  );
};

// REFACTORED UNIT BUTTONS
const handleUnitChange = function (e) {
  //remove 'active from all buttons'
  elements.unitButtons.forEach((btn) => btn.classList.remove('active'));

  //add Active to the clicked button
  e.currentTarget.classList.add('active');

  if (!elements.card.classList.contains('hidden')) {
    updateTemperatureDisplay();
  }
};

//EVENT LISTENER
elements.form.addEventListener('submit', function (e) {
  e.preventDefault();

  const city = elements.input.value.trim();

  if (!city) {
    showMessage('Please enetr a city to search', 'error');
    return;
  }

  searchByCity(city);
});

// ATTACH LOCATE BTN IN LISTENER AND CALL FUNCTION searchByLocation
elements.locateBtn.addEventListener('click', searchByLocation);

//TODO FOR REVIEW FOR TOMORROW
// UNIT TOGGLE FUNCTIONALITY
const updateTemperatureDisplay = function () {
  if (!currentWeatherData || !currentLocationData) return;
  renderWeather(currentLocationData, currentWeatherData);
};

// document.querySelectorAll('.unit-btn').forEach((btn) => {
//   btn.addEventListener('click', function () {
//     //update active button
//     document
//       .querySelectorAll('.unit-btn')
//       .forEach((b) => b.classList.remove('active'));
//     btn.classList.add('active');

//     //update display if weather is shown
//     if (!elements.card.classList.contains('hidden')) {
//       updateTemperatureDisplay();
//     }
//   });
// });

// event listner for toggling unit buttons
elements.unitButtons.forEach((btn) => {
  btn.addEventListener('click', handleUnitChange);
});

//INITIALIZE APP

// Initialize app
window.addEventListener('DOMContentLoaded', () => {
  // App starts with clean interface - no default search
});
