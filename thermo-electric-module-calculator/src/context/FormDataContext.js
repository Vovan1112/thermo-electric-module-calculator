import { createContext, useState } from "react";

export const FormDataContext = createContext();

const FormDataContextProvider = ({children}) => {

    const [formDataContext, setFormDataContext] = useState({
        branchSize: '',
        branchHeight: '',
        accumulationThickness: '',
        ceramicPlateThickness: '',
        branchSpacing: '',
        branchCount: '',
      });

    return (
        <FormDataContext.Provider value={{formDataContext, setFormDataContext}}>
            {children}
        </FormDataContext.Provider>
    )
}

export default FormDataContextProvider