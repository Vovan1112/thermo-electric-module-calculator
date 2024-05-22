import { createContext, useState } from "react";

export const FormDataContext = createContext();

const FormDataContextProvider = ({children}) => {

    const [formDataContext, setFormDataContext] = useState({
        branchSize: 1,
        branchHeight: 1,
        accumulationThickness: 0.3,
        ceramicPlateThickness: 0.3,
        branchSpacing: 1,
        branchCount: 0,
      });

    return (
        <FormDataContext.Provider value={{formDataContext, setFormDataContext}}>
            {children}
        </FormDataContext.Provider>
    )
}

export default FormDataContextProvider