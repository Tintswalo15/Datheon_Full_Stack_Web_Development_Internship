
/* =========================================
   WEATHER NOW - WEATHER APPLICATION
========================================= */

// 1. HTML ELEMENTS

const searchForm = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const searchButton = document.getElementById("search-btn");

const loading = document.getElementById("loading");
const errorMessage = document.getElementById("error-message");

const cityName = document.getElementById("city-name");
const currentDate = document.getElementById("current-date");
const weatherIcon = document.getElementById("weather-icon");
const temperature = document.getElementById("temperature");
const weatherDescription = document.getElementById("weather-description");

const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const pressure = document.getElementById("pressure");

const forecastContainer = document.getElementById("forecast-container");


// 2. OPENWEATHERMAP API URLS

const CURRENT_WEATHER_URL =
    "https://api.openweathermap.org/data/2.5/weather";

const FORECAST_URL =
    "https://api.openweathermap.org/data/2.5/forecast";


// 3. LOADING INDICATOR

function showLoading() {
    loading.classList.remove("hidden");
    errorMessage.classList.add("hidden");
    searchButton.disabled = true;
}

function hideLoading() {
    loading.classList.add("hidden");
    searchButton.disabled = false;
}


// 4. ERROR MESSAGE

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove("hidden");
}


// 5. FORMAT DATE

function formatDate(date) {
    return new Intl.DateTimeFormat("en-ZA", {
        weekday: "long",
        day: "numeric",
        month: "long"
    }).format(date);
}


// 6. CHANGE BACKGROUND BASED ON WEATHER

function changeWeatherBackground(condition) {

    document.body.classList.remove(
        "sunny",
        "cloudy",
        "rainy",
        "snowy",
        "stormy"
    );

    if (condition.includes("clear")) {
        document.body.classList.add("sunny");

    } else if (condition.includes("cloud")) {
        document.body.classList.add("cloudy");

    } else if (
        condition.includes("rain") ||
        condition.includes("drizzle")
    ) {
        document.body.classList.add("rainy");

    } else if (condition.includes("snow")) {
        document.body.classList.add("snowy");

    } else if (condition.includes("thunderstorm")) {
        document.body.classList.add("stormy");
    }
}


// 7. GET CURRENT WEATHER

async function getCurrentWeather(city) {

    const url =
        `${CURRENT_WEATHER_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

    const response = await fetch(url);

    if (!response.ok) {

        if (response.status === 404) {
            throw new Error("City not found. Please try another city.");
        }

        if (response.status === 401) {
            throw new Error("Invalid API key or API key not activated yet.");
        }

        throw new Error("Unable to get weather information.");
    }

    return await response.json();
}


// 8. DISPLAY CURRENT WEATHER

function displayCurrentWeather(data) {

    cityName.textContent =
        `${data.name}, ${data.sys.country}`;

    currentDate.textContent =
        formatDate(new Date());

    temperature.textContent =
        `${Math.round(data.main.temp)}°C`;

    weatherDescription.textContent =
        data.weather[0].description;

    weatherIcon.src =
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    weatherIcon.alt = data.weather[0].description;

    humidity.textContent =
        `${data.main.humidity}%`;

    windSpeed.textContent =
        `${(data.wind.speed * 3.6).toFixed(1)} km/h`;

    pressure.textContent =
        `${data.main.pressure} hPa`;

    // Change background
    changeWeatherBackground(
        data.weather[0].main.toLowerCase()
    );
}


// 9. GET FIVE-DAY FORECAST

async function getForecast(city) {

    const url =
        `${FORECAST_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Unable to get the weather forecast.");
    }

    return await response.json();
}


// 10. DISPLAY FIVE-DAY FORECAST

function displayForecast(data) {

    forecastContainer.innerHTML = "";

    const dailyForecasts = {};

    // Group weather information by date
    data.list.forEach((item) => {

        const date = item.dt_txt.split(" ")[0];

        if (!dailyForecasts[date]) {
            dailyForecasts[date] = [];
        }

        dailyForecasts[date].push(item);
    });

    // Select five days
    const fiveDays =
        Object.values(dailyForecasts).slice(0, 5);

    fiveDays.forEach((day) => {

        // Find forecast closest to midday
        const forecast = day.reduce((closest, item) => {

            const itemHour =
                Number(item.dt_txt.split(" ")[1].slice(0, 2));

            const closestHour =
                Number(closest.dt_txt.split(" ")[1].slice(0, 2));

            return Math.abs(itemHour - 12) <
                Math.abs(closestHour - 12)
                ? item
                : closest;

        });

        const date = new Date(forecast.dt * 1000);

        // Create forecast card
        const card = document.createElement("div");

        card.classList.add("forecast-card");

        const dayName = date.toLocaleDateString("en-ZA", {
            weekday: "short"
        });

        card.innerHTML = `
            <h3>${dayName}</h3>

            <img
                src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
                alt="${forecast.weather[0].description}"
            >

            <p class="forecast-temperature">
                ${Math.round(forecast.main.temp)}°C
            </p>

            <p>${forecast.weather[0].description}</p>
        `;

        forecastContainer.appendChild(card);
    });
}


// 11. SEARCH WEATHER

async function searchWeather(city) {

    if (!city.trim()) {
        showError("Please enter a city name.");
        return;
    }

    showLoading();

    try {

        const currentData =
            await getCurrentWeather(city);

        const forecastData =
            await getForecast(city);

        displayCurrentWeather(currentData);

        displayForecast(forecastData);

        // Clear search box
        cityInput.value = "";

    } catch (error) {

        showError(error.message);

    } finally {

        hideLoading();
    }
}


// 12. SEARCH BUTTON EVENT

searchForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const city = cityInput.value.trim();

    searchWeather(city);
});


// 13. LOAD DEFAULT CITY

searchWeather("Pretoria");
