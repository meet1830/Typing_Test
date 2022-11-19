import { GlobalStyles } from "./Styles/global";
import TypingBox from "./Components/TypingBox";
import Footer from "./Components/Footer";
import { ThemeProvider } from "styled-components";
import { useTheme } from "./Context/ThemeContext";

function App() {
  const {theme} = useTheme();

  return (
    <ThemeProvider theme={theme} >
      <div className="canvas">
        <GlobalStyles />
        <h1 style={{ textAlign: "center" }}>Typing Test</h1>
        <TypingBox />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
