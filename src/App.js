import { GlobalStyles } from "./Styles/global";
import TypingBox from "./Components/TypingBox";

const randomWords = require('random-words');

function App() {
  const words = randomWords(100);

  return (
    <div className="canvas">
      <GlobalStyles />
      <h1 style={{textAlign: "center"}}>Typing Test</h1>
      <TypingBox words={words}/>
      <h1 style={{textAlign: "center"}}>Footer</h1>
    </div>
  );
}

export default App;
