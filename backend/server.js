const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Forecast Bust Detection API is running!");
});
app.get("/weather", async (req, res) => {
  try {
    const city = req.query.city;

    if (!city) {
      return res.status(400).json({
        error: "City name is required"
      });
    }

    // City name → latitude/longitude
    const geoResponse = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
    );

    const geoData = await geoResponse.json();

    if (!geoData.results || geoData.results.length === 0) {
      return res.status(404).json({
        error: "City not found"
      });
    }

    const location = geoData.results[0];

    // Coordinates → weather
    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m&hourly=precipitation_probability&timezone=auto`
    );

   const weatherData = await weatherResponse.json();

if (!weatherResponse.ok) {
  throw new Error(`Weather API error: ${weatherResponse.status}`);
}

if (!weatherData.current) {
  console.log("Open-Meteo response:", weatherData);

  return res.status(502).json({
    error: "Weather API did not return current weather data",
    details: weatherData
  });
}

    res.json({
      city: location.name,
      country: location.country,
      temperature: weatherData.current.temperature_2m,
      humidity: weatherData.current.relative_humidity_2m,
      windSpeed: weatherData.current.wind_speed_10m,
      rainProbability: weatherData.hourly.precipitation_probability[0]
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch weather data"
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});