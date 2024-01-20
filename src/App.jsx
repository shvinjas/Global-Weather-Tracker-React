import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [userEnteredCity, setUserEnteredCity] = useState("");
  const [currentCity, setCurrentCity] = useState("Auckland");
  const [weatherData, setWeatherData] = useState("");

  useEffect(() => {
    fetch(`http://api.weatherapi.com/v1/current.json?key=2ce0be2f041c4b6eb7262435230712&q=${currentCity}&aqi=no
  `)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setWeatherData(result);
      })
      .catch((error) => console.log(error));
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
        <h4>Please enter you city </h4>
      </label>
      <input onChange={handleChange}></input>
      <br></br>
      <button onClick={(e) => handleClick()}>Search</button>
      <h4>
        {weatherData && weatherData.location.name} 's temperature is{" "}
        {weatherData && weatherData.current.temp_c} c{" "}
      </h4>
      <p>{weatherData && weatherData.current.condition.text}</p>
      <img
        src={weatherData && weatherData.current.condition.icon}
        alt="icon"
      ></img>
    </div>
  );
}

export default App;
