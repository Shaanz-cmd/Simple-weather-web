const apiKey = "0fffe31de1dbf462fbf61e7fccf3b878";
const cities = ["London", "Tokyo", "New York", "Cape Town"];
const weatherDiv = document.getElementById("cities");

// Function to fetch weather data for a single city
const fetchWeather = async (city) => {
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
};

// Main function to get weather data for all cities
const getWeatherForCities = async () => {
  let allWeatherHTML = "";

  for (let i = 0; i < cities.length; i++) {
    const city = cities[i];
    console.log(city);
    const data = await fetchWeather(city);

    if (data) {
      allWeatherHTML += `
        <div class="city">
          <h3>Weather in ${data.name}</h3>
          <p>Temperature: ${(data.main.temp - 273.15).toFixed(2)}°C</p>
          <p>Weather: ${data.weather[0].description}</p>
          <p>Humidity: ${data.main.humidity}%</p>
        </div>
      `;
    }
  }

  weatherDiv.innerHTML = allWeatherHTML;
};

getWeatherForCities();
