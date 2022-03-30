import { useState } from "react";
import { apiKey } from "../config/apiKey";

const Scenario1 = () => {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState('')
  const [recommendation, setRecommendation] = useState('')

  const handleSelectCity = (e) => {
    setCity(e.target.value)
  }

  const getWeather = (e) => {
    e.preventDefault()
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
      .then(res => res.json())
      .then(({ weather }) => {
        if (weather && weather.length > 0) {
          setWeather(weather[0].main)
          switch (weather[0].main) {
            case 'Clear':
              setRecommendation('You should not bring anything')
              break
            case 'Clouds':
              setRecommendation('You should bring a cap')
              break
            case 'Rain':
              setRecommendation('You should bring an umbrella')
              break
            default:
              setRecommendation('Unknown weather, stay home!')
          }
        }
      })
  }

  return (
    <div>
      <h1>Weather Checker</h1>
      <form onSubmit={getWeather} className='form-control'>
        <label>Select Locality</label>
        <select name="city" onChange={handleSelectCity}>
          <option hidden value="">Area</option>
          <option value="Manila">Manila</option>
          <option value="Cebu">Cebu</option>
          <option value="Sydney">Sydney</option>
        </select>
        <br/>
        <button onClick={getWeather}>Get Weather</button>

        {recommendation !== '' && (
          <>
            <h2>Weather: {weather}</h2>
            <p>Recommendation: {recommendation}</p>
          </>
        )}
      </form>
    </div>
  );
};

export default Scenario1;
