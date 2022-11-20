import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { TestModeContextProvider } from "./Context/TestMode";
import { ThemeContextProvider } from "./Context/ThemeContext";
import { BrowserRouter } from "react-router-dom";
import { AlertContextProvider } from "./Context/AlertContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeContextProvider>
      <AlertContextProvider>
        <TestModeContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </TestModeContextProvider>
      </AlertContextProvider>
    </ThemeContextProvider>
  </React.StrictMode>
);
