import { useContext, useState } from "react";
import { createContext } from "react";

// not exporting the context because exporting context is not a good practice. Every component in the project can have access to the context
// consider testmodecontext as a normal fucntional component
// children is a property of every fc where if want to get to the children component. this prop value is passed
const TestModeContext = createContext();

export const TestModeContextProvider = ({children}) => {
    const [testTime, setTestTime] = useState(15);
    
    const values = {
        testTime,
        setTestTime,
    };

    // using provider pass all the values to the children. the object passing to the value will get propagated to all the children
    return (<TestModeContext.Provider value={values}>{children}</TestModeContext.Provider>)
}

// cannot export it hence create a custom hook
// now want to use anywhere do not have to import usecontext and testmodecontext
// now wrapping testmodecontextprovider in index.js
export const useTestMode = () => useContext(TestModeContext);