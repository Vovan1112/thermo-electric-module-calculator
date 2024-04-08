import React, { useState } from 'react';
import { Box, TextField } from '@mui/material';
import Plot from 'react-plotly.js';

function PieChart() {
  const [temperatureHot, setTemperatureHot] = useState(100);
  const [temperatureCold, setTemperatureCold] = useState(25);
  const [resistance, setResistance] = useState(10);

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
    <Box className="PieChart">
      <h1>Термоелектричний модуль</h1>
      <Box className="input-container">
        <TextField
          type="number"
          label="Температура нагріву (°C)"
          value={temperatureHot}
          onChange={(e) => handleTemperatureChange(e, 'hot')}
        />
      </Box>
      <Box className="input-container">
        <TextField
          type="number"
          label="Температура охолодження (°C)"
          value={temperatureCold}
          onChange={(e) => handleTemperatureChange(e, 'cold')}
        />
      </Box>
      <Box className="input-container">
        <TextField
          type="number"
          label="Опір термоелектричного модуля (Ом)"
          value={resistance}
          onChange={(e) => handleResistanceChange(e)}
        />
      </Box>
      <Box className="result-container">
        <h2>КПД модуля: {calculateEfficiency().toFixed(2)}%</h2>
        <h2>Напруга на модулі: {calculateVoltage().toFixed(2)} В</h2>
        <h2>Потужність теплового потоку: {calculateHeatPower().toFixed(2)} Вт</h2>
        <h2>Коефіцієнт продуктивності: {calculateCOP().toFixed(2)}</h2>
      </Box>
      <Box className="plot-container">
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
      </Box>
    </Box>
  );
}

export default PieChart;
