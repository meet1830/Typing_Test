import { Route, Routes } from "react-router-dom";
import DynamicRoute from "./Pages/DynamicRoute";
import ErrorPage from "./Pages/ErrorPage";
import HomePage from "./Pages/HomePage";
import UserPage from "./Pages/UserPage";

function App() {
  // enabling routing hence home page consists of all the things that app.js, (have not made the user page till now) consists hence copy pasting the contents there. 
  // now implement routing here

  return (
    <Routes>
      <Route path="/" element={<HomePage />} ></Route>
      <Route path="/user" element={<UserPage />} ></Route>

      {/* not used in this project */}
      <Route path="/user/:id" element={<DynamicRoute />} ></Route>
      <Route path="*" element={<ErrorPage />} ></Route>
    </Routes>
  );
}

export default App;
