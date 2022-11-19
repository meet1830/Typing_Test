import React from "react";
import Select from "react-select";
import { themeOptions } from "../Styles/theme";
import { useTheme } from "../Context/ThemeContext";

const Footer = () => {
  const { setTheme } = useTheme();

  const handleThemeChange = (e) => {
    // console.log(e.value);
    /*
        -> when we select red theme
         {label: 'Red Theme', background: 'red', title: 'white', typeBoxText: 'blue', stats: 'purple'}
        
        -> if select dark theme then dark will log
        -> if just console.log(e) then whole object will log, for that theme
        -> this happens automatically for react select 
    */

    setTheme(e.value);
  };

  return (
    <div className="footer">
      <div className="footer-links">Links</div>
      <div className="theme-options">
        {/* selector - can also implement selection using material ui but a little complex simpler for react select lib */}
        <Select
          options={themeOptions}
          // will have a button here for select. In options, takes an array and automatically maps the labels and values inside the array. the selected option by the user - its value from the object in the array will be passed to the onchange function
          menuPlacement="top"
          // if the length of the selection table becomes large and goes beyond screen the browser will place a scrollbar. but through this option we can make the menu to not appear below the select button but above it where there is more space
          onChange={handleThemeChange}
        />
      </div>
    </div>
  );
};

export default Footer;
