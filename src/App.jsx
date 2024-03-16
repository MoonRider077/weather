import React, { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(false);

  const handleSearch = () => {
    const APIkey = 'bbbe0a6a69380b84e46ef974a64525f2';

    if (city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`)
      .then((response) => response.json())
      .then((json) => {
        if (json.cod === '404') {
          setError(true);
          setWeatherData(null);
        } else {
          switch (json.weather[0].main) {
            case 'Clear':
              setWeatherData({ ...json, imageSrc: '/images/clear.png' });
              break;

            case 'Rain':
              setWeatherData({ ...json, imageSrc: '/images/rain.png' });
              break;

            case 'Snow':
              setWeatherData({ ...json, imageSrc: '/images/snow.png' });
              break;

            case 'Clouds':
              setWeatherData({ ...json, imageSrc: '/images/cloud.png' });
              break;

            case 'Mist':
            case 'Haze':
              setWeatherData({ ...json, imageSrc: '/images/mist.png' });
              break;

            default:
              setWeatherData({ ...json, imageSrc: '/images/cloud.png' });
          }
          setError(false);
        }
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
        setError(true);
        setWeatherData(null);
      });
  };

  return (
    <div className="container">
      <div className="search__box">
        <i className="bx bxs-map"></i>
        <input
          type="text"
          placeholder="Enter your location"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="bx bx-search" onClick={handleSearch}></button>
      </div>

      {weatherData && (
        <>
          <div className="weather__box active">
            <div className="box">
              <div className="info__weather">
                <div className="weather">
                  <img
                    src={weatherData.imageSrc} 
                    alt={weatherData.weather[0].main}
                  />
                  <p className="temperature">
                    {weatherData.main.temp}
                    <span>°C</span>
                  </p>
                  <p className="description">{weatherData.weather[0].description}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="weather__details active">
            <div className="humidity">
              <i className="bx bx-water"></i>
              <div className="text">
                <div className="info__humidity">
                  <span>{weatherData.main.humidity}%</span>
                </div>
                <p>Humidity </p>
              </div>
            </div>

            <div className="wind">
              <i className="bx bx-wind"></i>
              <div className="text">
                <div className="info__wind">
                  <span>{weatherData.wind.speed}KM/h</span>
                </div>
                <p>Wind Speed</p>
              </div>
            </div>
          </div>
        </>
      )}

      {error && (
        <div className="not__found active">
          <div className="box">
            <img src="/images/404.png" alt="Not found" /> 
            <p>Oops! Location not found!</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
