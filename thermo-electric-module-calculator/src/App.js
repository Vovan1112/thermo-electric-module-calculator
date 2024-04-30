import React from 'react';
import ThermoelectricModuleForm from './components/ThermoelectricModuleForm/ThermoelectricModuleForm';
import ThreeJSModel from './components/ThreeJSModel/ThreeJSModel';
import PieChart from './components/PieChart/PieChart';
import FormDataContextProvider from './context/FormDataContext';

function App() {
  return (
    <>
      <PieChart />
      <FormDataContextProvider>
      <ThermoelectricModuleForm />
      <ThreeJSModel />
      </FormDataContextProvider>
    </>
  );
}

export default App;
