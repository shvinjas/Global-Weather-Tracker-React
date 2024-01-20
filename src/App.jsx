import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [userEnteredCity, setUserEnteredCity] = useState("");
  const [currentCity, setCurrentCity] = useState("Auckland");
  const [weatherData, setWeatherData] = useState(null); // Initialize as null

  useEffect(() => {
    fetch(
      `https://api.weatherapi.com/v1/current.json?key=2ce0be2f041c4b6eb7262435230712&q=${currentCity}&aqi=no`
    )//fetch
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        // Check if the API response contains valid data
        if (result.location && result.current) {
          setWeatherData(result);
        } else {
          // Handle invalid city name or no data
          setWeatherData(null);
        }
      })
      .catch((error) => {
        console.log(error);
        // Handle fetch error
        setWeatherData(null);
      });
  }, [currentCity]);

  const handleChange = (e) => {
    setUserEnteredCity(e.target.value);
    console.log(e.target.value);
  };

  const handleClick = (e) => {
    setCurrentCity(userEnteredCity);
    console.log(userEnteredCity);
  };

  useEffect(() => {
    console.log(weatherData, userEnteredCity);
  }, [weatherData, userEnteredCity]);

  return (
    <div className="Container">
      <h1>Weather App</h1>
      <label>
        <h4>Please enter your city </h4>
      </label>
      <input onChange={handleChange}></input>
      <br></br>
      <button onClick={(e) => handleClick()}>Search</button>

      {weatherData ? (
        <>
          <h4>
            {weatherData.location.name}'s temperature is{" "}
            {weatherData.current.temp_c} °C
          </h4>
          <p>{weatherData.current.condition.text}</p>
          <img src={weatherData.current.condition.icon} alt="icon"></img>
        </>
      ) : (
        <p>
          No data available for the entered location.
          <p>please enter a valid location</p>
        </p>
      )}
    </div>
  );
}

export default App;
