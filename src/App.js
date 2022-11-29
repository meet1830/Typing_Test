import { Route, Routes } from "react-router-dom";
import DynamicRoute from "./Pages/DynamicRoute";
import ErrorPage from "./Pages/ErrorPage";
import HomePage from "./Pages/HomePage";
import UserPage from "./Pages/UserPage";
import Alert from "./Components/Alert";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./Styles/global";
import { useTheme } from './Context/ThemeContext';
import ComparePage from "./Pages/ComparePage";

function App() {
  const { theme } = useTheme();
  return (
      <ThemeProvider theme={theme}>
      {/* shifting themes from homepage to app.js as want to now apply themes to userpage also hence theme need to be accessible in the whole app */}
        <GlobalStyles />
        <Alert />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/user" element={<UserPage />}></Route>
          <Route path="/compare/:username" element={<ComparePage />} ></Route>

          {/* not used in this project */}
          {/* <Route path="/user/:id" element={<DynamicRoute />}></Route>
          <Route path="*" element={<ErrorPage />}></Route> */}
        </Routes>
      </ThemeProvider>
  );
}

export default App;
