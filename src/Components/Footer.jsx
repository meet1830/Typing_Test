import React from "react";
import Select from "react-select";
import { themeOptions } from "../Styles/theme";
import { useTheme } from "../Context/ThemeContext";

const Footer = () => {
  const { setTheme, defaultTheme, theme } = useTheme();

  const handleThemeChange = (e) => {
    setTheme(e.value);

    // saving the theme to local storage
    // ls a hashmap with key and value pair
    // here store data only in form of strings
    localStorage.setItem('theme', JSON.stringify(e.value));

    // now fetch it in context to persist it with reload
  };

  return (
    <div className="footer">
      <div className="footer-links">Links</div>
      <div className="theme-options">
        <Select
          options={themeOptions}
          menuPlacement="top"
          onChange={handleThemeChange}
          
          // adding default value in the selector options so that it does not remain blank
          // added default theme in the theme context
          // pass object here
          defaultValue={{ value: defaultTheme.value, label: defaultTheme.label }}

          // now styling the select component 
          // imported theme from usetheme context
          // in documentation of select component, the control and menu are given different styling options. here destructuring the styling object and adding the property to change the value that we want
          styles = {{
            control: (styles) => ({...styles, backgroundColor: theme.background }), 
            menu: (styles) => ({...styles, backgroundColor: theme.background })
          }}
          // hence if using any third party components then have to read docs to understand styling. normal css dont work there. same for mui components
        />
      </div>
    </div>
  );
};

export default Footer;
