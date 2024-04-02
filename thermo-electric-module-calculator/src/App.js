import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import './App.css';

function App() {
  const [temperatureHot, setTemperatureHot] = useState(100); // початкова температура нагріву
  const [temperatureCold, setTemperatureCold] = useState(25); // початкова температура охолодження
  const [resistance, setResistance] = useState(10); // опір термоелектричного модуля

  const calculateEfficiency = () => {
    return ((temperatureHot - temperatureCold) / temperatureHot) * 100;
  };

  const calculateVoltage = () => {
    return resistance * (temperatureHot - temperatureCold);
  };

  const calculateHeatPower = () => {
    return Math.pow(calculateVoltage(), 2) / resistance;
  };

  const calculateCOP = () => {
    return calculateHeatPower() / (calculateVoltage() * 0.001);
  };

  const handleTemperatureChange = (e, type) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      if (type === 'hot') {
        setTemperatureHot(value);
      } else {
        setTemperatureCold(value);
      }
    }
  };

  const handleResistanceChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setResistance(value);
    }
  };

  return (
    <div className="App">
      <h1>Термоелектричний модуль</h1>
      <div className="input-container">
        <label>Температура нагріву (°C):</label>
        <input
          type="number"
          value={temperatureHot}
          onChange={(e) => handleTemperatureChange(e, 'hot')}
        />
      </div>
      <div className="input-container">
        <label>Температура охолодження (°C):</label>
        <input
          type="number"
          value={temperatureCold}
          onChange={(e) => handleTemperatureChange(e, 'cold')}
        />
      </div>
      <div className="input-container">
        <label>Опір термоелектричного модуля (Ом):</label>
        <input
          type="number"
          value={resistance}
          onChange={(e) => handleResistanceChange(e)}
        />
      </div>
      <div className="result-container">
        <h2>КПД модуля: {calculateEfficiency().toFixed(2)}%</h2>
        <h2>Напруга на модулі: {calculateVoltage().toFixed(2)} В</h2>
        <h2>Потужність теплового потоку: {calculateHeatPower().toFixed(2)} Вт</h2>
        <h2>Коефіцієнт продуктивності: {calculateCOP().toFixed(2)}</h2>
      </div>
      <div className="plot-container">
        <Plot
          data={[
            {
              type: 'pie',
              values: [calculateEfficiency(), 100 - calculateEfficiency()],
              labels: ['ККД', ''],
              hole: 0.4,
            },
          ]}
          layout={{ width: 400, height: 400, title: 'Графік ККД' }}
        />
      </div>
    </div>
  );
}

export default App;
