import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import { ThemeContext } from "styled-components";
import { themeOptions } from "../Styles/theme";


const themeContext = createContext();

export const ThemeContextProvider = ({children}) => {
    // if local storage contains theme then set that theme else set default theme
    const defaultTheme = (JSON.parse(localStorage.getItem('theme')) || themeOptions[0].value );

    const [theme, setTheme] = useState(defaultTheme);
    
    const values = {
        theme, 
        setTheme,
        defaultTheme
    };

    return (<ThemeContext.Provider value={values} >{children}</ThemeContext.Provider>)
}

export const useTheme = () => useContext(ThemeContext);