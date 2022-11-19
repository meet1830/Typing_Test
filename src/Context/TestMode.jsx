import { useContext, useState } from "react";
import { createContext } from "react";

const TestModeContext = createContext();

export const TestModeContextProvider = ({children}) => {
    const [testTime, setTestTime] = useState(15);
    
    const values = {
        testTime,
        setTestTime,
    };

    return (<TestModeContext.Provider value={values}>{children}</TestModeContext.Provider>)
}

// cannot export it hence create a custom hook
export const useTestMode = () => useContext(TestModeContext);