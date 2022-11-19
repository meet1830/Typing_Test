import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import { ThemeContext } from "styled-components";
import { themeOptions } from "../Styles/theme";


const themeContext = createContext();

export const ThemeContextProvider = ({children}) => {
    const defaultTheme = themeOptions[0].value;
    // first option of the export array is the default theme    
    const [theme, setTheme] = useState(defaultTheme);
    
    const values = {
        theme, 
        setTheme
    };

    return (<ThemeContext.Provider value={values} >{children}</ThemeContext.Provider>)
}

export const useTheme = () => useContext(ThemeContext);