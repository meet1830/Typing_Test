import React from "react";
import Select from "react-select";
import { themeOptions } from "../Styles/theme";
import { useTheme } from "../Context/ThemeContext";
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
  const { setTheme, defaultTheme, theme } = useTheme();

  const handleThemeChange = (e) => {
    setTheme(e.value);
    localStorage.setItem("theme", JSON.stringify(e.value));
  };

  const handleClick = () => {
    window.open(
      'https://github.com/meet1830/Typing_Test',
      '_blank'
    );
  }

  return (
    <div className="footer">
      <div className="instructions">
        <div className="hint">press <kbd>Tab</kbd> to open commands</div>
      </div>
      <div className="actual-footer">
        <div className="footer-links" onClick={handleClick}>
          <GitHubIcon />
        </div>
        <div className="theme-options">
          <Select
            options={themeOptions}
            menuPlacement="top"
            onChange={handleThemeChange}
            defaultValue={{
              value: defaultTheme.value,
              label: defaultTheme.label,
            }}
            styles={{
              control: (styles) => ({
                ...styles,
                backgroundColor: theme.background,
              }),
              menu: (styles) => ({
                ...styles,
                backgroundColor: theme.background,
              }),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
