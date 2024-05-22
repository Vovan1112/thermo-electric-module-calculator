import React, { useState } from 'react';
import { Box, TextField } from '@mui/material';
import Plot from 'react-plotly.js';

function PieChart() {
  const [temperatureHot, setTemperatureHot] = useState(100);
  const [temperatureCold, setTemperatureCold] = useState(25);
  const [resistance, setResistance] = useState(10);
  const [avarageM, setAvarageM] = useState(1);

  const calculateVoltage = () => {
    return resistance * (temperatureHot - temperatureCold);
  };

  const calculateHeatPower = () => {
    return Math.pow(calculateVoltage(), 2) / resistance;
  };

  const calculateCOP = () => {
    return calculateHeatPower() / (calculateVoltage() * 0.001);
  };

  const calculateEmax = (T, T0, M) => {
    const term1 = T / (T0 - T);
    const term2 = (M - (T0 / T)) / (M + 1);
    return term1 * term2;
  };

  const calculateQmax = (T, T0, zT) => {
    const term1 = T - 2 * (T0 - T) / (zT);
    return term1 / (2 * T0);
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

  const handleZTavgChange = (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setAvarageM(value);
    }
  };

  const Emax = calculateEmax(temperatureCold + 273.15, temperatureHot + 273.15, avarageM);
  const Qmax = calculateQmax(temperatureCold + 273.15, temperatureHot + 273.15, avarageM);

  return (
    <Box className="PieChart" textAlign="center">
      <h1>Термоелектричний модуль</h1>
      <Box className="input-container" marginBottom="10px">
        <TextField
          type="number"
          label="Температура нагріву (°C)"
          value={temperatureHot}
          onChange={(e) => handleTemperatureChange(e, 'hot')}
        />
      </Box>
      <Box className="input-container" marginBottom="10px">
        <TextField
          type="number"
          label="Температура охолодження (°C)"
          value={temperatureCold}
          onChange={(e) => handleTemperatureChange(e, 'cold')}
        />
      </Box>
      <Box className="input-container" marginBottom="10px">
        <TextField
          type="number"
          label="Опір термоелектричного модуля (Ом)"
          value={resistance}
          onChange={(e) => handleResistanceChange(e)}
        />
      </Box>
      <Box className="input-container" marginBottom="10px">
        <TextField
          type="number"
          label="M середнє"
          value={avarageM}
          onChange={(e) => handleZTavgChange(e)}
        />
      </Box>
      <Box className="result-container">
        <h2>Напруга на модулі: {calculateVoltage().toFixed(2)} В</h2>
        <h2>Потужність теплового потоку: {calculateHeatPower().toFixed(2)} В</h2>
        <h2>Коефіцієнт продуктивності: {calculateCOP().toFixed(2)}</h2>
        <h2>Emax: {Emax.toFixed(2)}</h2>
        <h2>Qmax: {Qmax.toFixed(2)}</h2>
      </Box>
      <Box className="plot-container" marginTop="30px">
        {/* <Plot
          data={[
            {
              type: 'pie',
              values: [calculateEfficiency(), 100 - calculateEfficiency()],
              labels: ['ККД', ''],
              hole: 0.4,
            },
          ]}
          layout={{ width: 400, height: 400, title: 'Графік ККД' }}
        /> */}
      </Box>
    </Box>
  );
}

export default PieChart;
