# WeatherNow – Live Weather Dashboard

## About the Project

WeatherNow is a responsive weather dashboard developed using HTML, CSS and JavaScript. It allows users to search for cities around the world and view real-time weather information using the OpenWeatherMap API.

The application provides current weather conditions, temperature, humidity, wind speed, atmospheric pressure and a five-day weather forecast.

## Features

- Search for weather information in cities worldwide.
- Display current temperature in Celsius.
- Show weather conditions with dynamic weather icons.
- Display humidity, wind speed and atmospheric pressure.
- Provide a five-day weather forecast.
- Dynamic background colours based on weather conditions.
- Loading indicator while retrieving weather information.
- Error handling for invalid city searches and API errors.
- Responsive user interface for different screen sizes.

## Technologies Used

- HTML5 – Application structure.
- CSS3 – Styling, layouts, animations and responsive design.
- JavaScript (ES6+) – Application functionality and API integration.
- OpenWeatherMap API – Live weather data and forecasts.
- Fetch API – Retrieving weather information.
- Async/Await – Handling asynchronous requests.
- Git and GitHub – Version control and project hosting.

## Project Structure

```text
Task-3-Weather-App/
│
├── index.html
├── style.css
├── script.js
├── config.js
├── .gitignore
└── README.md
```

## Getting Started

### 1. Clone the Repository

```bash
git clone YOUR_REPOSITORY_URL
```

### 2. Open the Project

Open the `Task-3-Weather-App` folder in Visual Studio Code.

### 3. Get an OpenWeatherMap API Key

- Visit https://openweathermap.org/
- Create a free account.
- Navigate to your API Keys section.
- Generate or copy your API key.

### 4. Configure Your API Key

Create a file named `config.js` in the project folder and add:

```javascript
const API_KEY = "YOUR_API_KEY_HERE";
```

Replace the placeholder with your own API key.

**Important:** The `config.js` file is excluded from Git using `.gitignore`. Never upload your actual API key to GitHub. Browser-based API keys are still visible to visitors, so a secure backend is recommended for production applications.

### 5. Run the Application

Open `index.html` using the Visual Studio Code Live Server extension.

Search for a city to view its current weather and five-day forecast.

## API Used

OpenWeatherMap API:

https://openweathermap.org/api

The application uses:
- Current Weather Data API.
- 5 Day / 3 Hour Forecast API.

## Learning Outcomes

Through this project, I gained practical experience in:

- Integrating third-party REST APIs.
- Working with JavaScript Fetch API.
- Using asynchronous JavaScript with Async/Await.
- Manipulating the DOM dynamically.
- Handling API responses and errors.
- Building responsive web interfaces.
- Organising a frontend development project.

## Author

**Tintswalo Hlungwani**

Information Technology Student

GitHub: https://github.com/Tintswalo15