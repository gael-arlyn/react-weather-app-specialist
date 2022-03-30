import { useState } from "react";
import { apiKey } from "../config/apiKey";

const Scenario3 = () => {
  const [humidity1, setHumidity1] = useState(0)
  const [humidity2, setHumidity2] = useState(0)
  const [recommendation, setRecommendation] = useState('')
  const [forms, setForms] = useState({
    city1: '',
    city2: '',
    country1: '',
    country2: ''
  })

  const handleComparisonFormChange = (e) => {
    setForms({
      ...forms,
      [e.target.name]: e.target.value
    })
  }

  const getCityComparison = (e) => {
    e.preventDefault()
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${forms.city1},${forms.country1}&appid=${apiKey}`)
      .then(res => res.json())
      .then(({ main }) => {
        setHumidity1(main.humidity)
      })

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${forms.city2},${forms.country2}&appid=${apiKey}`)
      .then(res => res.json())
      .then(({ main }) => {
        setHumidity2(main.humidity)
      })
      .catch(() => setRecommendation("Enter Valid Country and City Name"));
    if (humidity1 > humidity2) {
      setRecommendation(`${forms.country1} is more humid than ${forms.country2} by ${humidity1 - humidity2}`)
    } else if (humidity1 < humidity2) {
      setRecommendation(`${forms.country2} is more humid than ${forms.country1} by ${humidity2 - humidity1}`)
    } else {
      // setRecommendation('Both cities are equally humid')
    }
    
  }

  return (
    <>
      <h1>Humid Comparison</h1>
      <form onSubmit={getCityComparison} className='form-control'>
        <label>First City</label>
        <input
          type="text"
          name="city1"
          required
          onChange={handleComparisonFormChange}
        />
        <label>First Country</label>
        <input
          type="text"
          name="country1"
          required
          onChange={handleComparisonFormChange}
        />
        <label>Second City</label>
        <input
          type="text"
          name="city2"
          required
          onChange={handleComparisonFormChange}
        />
        <label>Second Country</label>
        <input
          type="text"
          name="country2"
          required
          onChange={handleComparisonFormChange}
        />
        <div>
          <button type="submit" onClick={getCityComparison}>
            Get Humidity
          </button>
        </div>

        {recommendation !== "" && (
          <>
            <h2>{forms.country1} has a humidity of {humidity1}</h2>
            <h2>{forms.country2} has a humidity of {humidity2}</h2>
            <p>Remarks: {recommendation}</p>
          </>
        )}
      </form>
    </>
  );
};

export default Scenario3;
