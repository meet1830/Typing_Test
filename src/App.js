import { GlobalStyles } from "./Styles/global";
import TypingBox from "./Components/TypingBox";
import Footer from "./Components/Footer";
import { ThemeProvider } from "styled-components";
import { useTheme } from "./Context/ThemeContext";
import { auth } from "./firebaseConfig";
import Header from "./Components/Header";

function App() {
  const {theme} = useTheme();
  console.log(auth);
  return (
    <ThemeProvider theme={theme} >
      <div className="canvas">
        <GlobalStyles />
        <Header />
        <TypingBox />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
