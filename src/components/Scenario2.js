import { useState } from "react";
import { apiKey } from "../config/apiKey";

const Scenario2 = () => {
  const [zipCode, setZipCode] = useState(0);
  const [temp, setTemp] = useState(0);
  const [recommendation, setRecommendation] = useState("");

  const handleSelectZipCode = (e) => {
    setZipCode(e.target.value)
  }

  const getZipcode = (e) => {
    e.preventDefault();

    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${zipCode},us&appid=${apiKey}`
    )
      .then((res) => res.json())
      .then(({ main }) => {
        let celciusTemp = Math.round(main.temp - 273.15);
        setTemp(celciusTemp);

        if (celciusTemp > 40) {
          setRecommendation("You should bring a jacket");
        } else if (celciusTemp <= 40 && celciusTemp >= 20) {
          setRecommendation("Do not wear long sleeves");
        } else if (celciusTemp <= 20 && celciusTemp >= -10) {
          setRecommendation("Wear a coat");
        } else {
          setRecommendation("Unknown weather, stay home!");
        }
      })
      .catch(() => setRecommendation("Enter a valid US ZIP Code"));
  };

  return (
    <>
      <h1>Temperature Checker</h1>
      <form onSubmit={getZipcode} className='form-control'>
        <label>ZIP code (US Based only)</label>
        <input type="text" name="zipcode" onChange={handleSelectZipCode} />
        <div>
          <button onClick={getZipcode}>Get Temperature</button>
        </div>

        {recommendation !== "" && (
          <>
            <h2>Temperature: {temp}°C</h2>
            <p>Recommendation: {recommendation}</p>
          </>
        )}
      </form>
    </>
  );
};

export default Scenario2;
