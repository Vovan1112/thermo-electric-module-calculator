import React, { useState, useContext } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { FormDataContext } from '../../context/FormDataContext';

function ThermoelectricModuleForm() {

  const { setFormDataContext } = useContext(FormDataContext);


  const [formData, updateFormData ] = useState({
    branchSize: '',
    branchHeight: '',
    accumulationThickness: '',
    ceramicPlateThickness: '',
    branchSpacing: '',
    branchCount: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setFormDataContext(formData)
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <TextField
          label="Розмір гілок"
          type="number"
          name="branchSize"
          value={formData.branchSize}
          onChange={handleChange}
        />
        <TextField
          label="Висота гілок"
          type="number"
          name="branchHeight"
          value={formData.branchHeight}
          onChange={handleChange}
        />
        <TextField
          label="Товщина накопичення"
          type="number"
          name="accumulationThickness"
          value={formData.accumulationThickness}
          onChange={handleChange}
        />
        <TextField
          label="Товщина керамічної пластини"
          type="text"
          name="ceramicPlateThickness"
          value={formData.ceramicPlateThickness}
          onChange={handleChange}
        />
        <TextField
          label="Крок між гілками"
          type="number"
          name="branchSpacing"
          value={formData.branchSpacing}
          onChange={handleChange}
        />
        <TextField
          label="Кількість гілок"
          type="number"
          name="branchCount"
          value={formData.branchCount}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained">Підтвердити</Button>
      </Box>
    </form>
  );
}

export default ThermoelectricModuleForm;
