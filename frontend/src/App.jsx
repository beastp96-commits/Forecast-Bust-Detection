import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [serverMessage, setServerMessage] = useState("");
  const [city, setCity] = useState("");

useEffect(() => {
  fetch("http://localhost:5000/")
    .then((response) => response.text())
    .then((data) => {
      setServerMessage(data);
    })
    .catch((error) => {
      console.log("Backend connection error:", error);
    });
}, []);
 const [weather, setWeather] = useState(null);

 const handleSearch = async () => {
    if (city.trim() === "") {
      alert("Please enter a city name");
      return;
    }

   try {
  const response = await fetch(
    `http://localhost:5000/weather?city=${encodeURIComponent(city)}`
  );

  const data = await response.json();
  setWeather(data);

  if (!response.ok) {
    alert(data.error || "Weather data fetch failed");
    return;
  }

  
} catch (error) {
  console.error(error);
  alert("Unable to connect to weather server");
}
  };

  return (
    <div className="app">

      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          🌦️ Forecast<span>Bust</span>
        </div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#dashboard">Dashboard</a>
          <a href="#about">About</a>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="backend-status">
  {serverMessage}
</div>
      <section className="hero" id="home">

        <div className="hero-content">

          <div className="badge">
            🤖 AI-Powered Weather Analysis
          </div>

          <h1>
            AI-Based Forecast
            <span> Bust Detection</span>
          </h1>

          <p>
            Detect when medium-range weather forecasts may significantly
            differ from actual weather conditions using intelligent
            data analysis.
          </p>

          {/* Search */}
          <div className="search-box">
            <input
              type="text"
              placeholder="Enter city name..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />

            <button onClick={handleSearch}>
              Check Forecast
            </button>
          </div>

        </div>

        {/* Weather Illustration */}
        <div className="weather-card">
          <div className="weather-icon">🌤️</div>

          <h3>Forecast Analysis</h3>

         <div className="temperature">
  {weather ? `${weather.temperature}°C` : "28°C"}
</div>

          <p>Medium-range forecast</p>
          <div className="ai-analysis">
  <h4>🤖 AI Forecast Analysis</h4>
  <p>
    {weather
      ? weather.rainProbability >= 60 || weather.humidity >= 80
        ? "⚠️ Current conditions indicate a possible forecast bust. Significant weather changes may require attention."
        : "✅ Current conditions are stable. No significant forecast bust detected."
      : "Enter a city and check the forecast to get AI analysis."}
  </p>
</div>
          {weather && (
  <div className="weather-details">
    <p>🌧️ Rain: {weather.rainProbability}%</p>
    <p>💧 Humidity: {weather.humidity}%</p>
    <p>💨 Wind: {weather.windSpeed} km/h</p>
  </div>
)}

          
          <div className="status">
  {weather ? (
    weather.rainProbability >= 60 || weather.humidity >= 80 ? (
      <>🔴 Possible Forecast Bust</>
    ) : (
      <>🟢 Forecast Reliable</>
    )
  ) : (
    <>🟢 Forecast Reliable</>
  )
  }
</div>
</div>
      </section>

      {/* Features */}
      <section className="features" id="dashboard">

        <h2>How Forecast Bust Detection Works</h2>

        <p className="section-text">
          Our system compares forecast information with observed weather
          conditions and identifies significant prediction errors.
        </p>

        <div className="feature-grid">

          <div className="feature-card">
            <div className="feature-icon">🌡️</div>
            <h3>Weather Forecast</h3>
            <p>
              Collect temperature, rainfall, humidity and wind forecast data.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3>AI Analysis</h3>
            <div className="risk-level">
  <h4>📊 Forecast Bust Risk</h4>
  <p>
    {weather
      ? weather.rainProbability >= 60 || weather.humidity >= 80
        ? "HIGH"
        : weather.rainProbability >= 30 || weather.humidity >= 60
        ? "MEDIUM"
        : "LOW"
      : "LOW"}
  </p>
</div>
            <p>
              Analyze forecast and observed values to identify unusual errors.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⚠️</div>
            <h3>Bust Detection</h3>
            <p>
              Detect possible forecast busts when the prediction differs
              significantly from actual conditions.
            </p>
          </div>

        </div>

      </section>

      {/* Dashboard Preview */}
      <section className="dashboard" id="about">

        <h2>Forecast Dashboard</h2>

        <div className="dashboard-grid">

          <div className="data-card">
            <h3>🌡️ Temperature</h3>
            <strong><strong>{weather ? `${weather.temperature}°C` : "28°C"}</strong></strong>
            <p>Forecast</p>
          </div>

          <div className="data-card">
            <h3>🌧️ Rain Probability</h3>
            <strong>{weather ? `${weather.rainProbability}%` : "65%"}</strong>
            <p>Forecast</p>
          </div>

          <div className="data-card">
            <h3>💨 Wind Speed</h3>
            <strong><strong>{weather ? `${weather.windSpeed} km/h` : "18 km/h"}</strong></strong>
            <p>Forecast</p>
          </div>

          <div className="data-card">
            <h3>🎯 Bust Risk</h3>
            <strong className="low-risk">Low</strong>
            <p>AI Detection</p>
          </div>

        </div>
        
      </section>

      {/* Footer */}
      <footer>
        <p>
          © 2026 ForecastBust | AI-Based Forecast Bust Detection
        </p>
      </footer>

    </div>
  );
}

export default App;