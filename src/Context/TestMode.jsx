import { useContext, useState } from "react";
import { createContext } from "react";

const TestModeContext = createContext();

export const TestModeContextProvider = ({children}) => {
    const [testTime, setTestTime] = useState(15);
    
    // implementing words mode, above word mode, need a state for word mode how many words are there, etc. 
    const [testMode, setTestMode] = useState('time'); 
    //time or words mode

    const [testWords, setTestWords] = useState(10); 
    // having 10 words by default in words mode

    const values = {
        testTime,
        setTestTime,
        testMode,
        setTestMode,
        testWords, 
        setTestWords
    };

    return (<TestModeContext.Provider value={values}>{children}</TestModeContext.Provider>)
}

export const useTestMode = () => useContext(TestModeContext);