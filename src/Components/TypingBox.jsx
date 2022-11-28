import React, { useMemo } from "react";
import { useState } from "react";
import { createRef } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useTestMode } from "../Context/TestMode";
import Stats from "./Stats";
import UpperMenu from "./UpperMenu";

var randomWords = require('random-words'); 

const TypingBox = () => {
  const [currWordIndex, setCurrWordIndex] = useState(0);
  const [currCharIndex, setCurrCharIndex] = useState(0);

  const {testTime, testMode, testWords} = useTestMode();
  
  const [countDown, setCountDown] = useState(() => {
    // if implement according to words then no need for countdown. but then wpm and all other is being calculated based on time hence have to rewrite the whole logic. hence when there is words mode initialize the time with a big number
    if (testMode === 'words') {
      return 180;
    } else {
      return testTime;
    }
  });
  const [testStart, setTestStart] = useState(false);
  const [testOver, setTestOver] = useState(false);

  const inputTextRef = useRef(null);

  const [intervalId, setIntervalId] = useState(null);

  // to find wpm
  const [correctChars, setCorrectChars] = useState(0);
  // to find accuracy
  const [correctWords, setCorrectWords] = useState(0);

  const [wordsArray, setWordsArray] = useState(() => {
    // type number of words mode
    if (testMode === 'words') {
      return randomWords(testWords);
    }
    return randomWords(100);
  })

  // states for numbers - characters
  const [incorrectChars, setIncorrectChars] = useState(0);
  // set incorrect chars in logic for correct and incorrect chars
  const [extraChars, setExtraChars] = useState(0);
  // set extra characters in logic for extra characters
  const [missedChars, setMissedChars] = useState(0);

  // for graph wpm vs time
  const [graphData, setGraphData] = useState([]);
  // timer function works every second hence can calculate our data per second from there

  const words = useMemo(() => {
    return wordsArray;
  }, [wordsArray]);

  const wordSpanRef = useMemo(() => {
    return Array(words.length).fill(0).map((i) => createRef(null));
  }, [words]);

  // from reset func
  const resetWordSpanRefClassNames = () => {
    wordSpanRef.map(i =>{ 
      Array.from(i.current.childNodes).map(j => {
        j.className = 'char';
      })
    });
    wordSpanRef[0].current.childNodes[0].className = "char current";
  }

  const handleOnKeyDown = (e) => {
    if (!testStart) {
      startTimer();
      setTestStart(true);
    }

    // access the char of current word and check comparing with key pressed
    let allChildrenSpans = wordSpanRef[currWordIndex].current.childNodes;

    // logic for pressing spacebar - if user enters spacebar
    if (e.keyCode === 32) {
      
      // game over logic for words mode
      // for words mode when user enters spacebar after the last word, then the test should finish
      if (currWordIndex === wordsArray.length - 1) {
        clearInterval(intervalId);
        setTestOver(true);
        return;
      }

      // for accuracy
      const correctChar = wordSpanRef[currWordIndex].current.querySelectorAll('.correct');

      // calculating incorrect characters for numbers - characters, 
      // setting missed chars -> total - (correct + incorrect) = missed
      const incorrectChar = wordSpanRef[currWordIndex].current.querySelectorAll('.incorrect');
      setMissedChars(missedChars + (allChildrenSpans.length - (incorrectChar.length + correctChar.length)));

      if (correctChar.length === allChildrenSpans.length) {
        setCorrectWords(correctWords + 1);
      }

      // logic for removing cursor from the curr word
      // remove the right cursor for prev word when we move on to the next word
      if (allChildrenSpans.length <= currCharIndex) {
        allChildrenSpans[currCharIndex - 1].classList.remove("right");
      } else {
        // current cursor should move to the next word, and also current cursor should get removed if hit space between the word
        allChildrenSpans[currCharIndex].className = allChildrenSpans[
          currCharIndex
        ].className.replace("current", "");
      }

      // add cursor to the next word
      wordSpanRef[currWordIndex + 1].current.childNodes[0].className =
        "char current";

      setCurrWordIndex(currWordIndex + 1);
      setCurrCharIndex(0);

      return;
    }

    // logic for backspace
    if (e.keyCode === 8) {
      // restricting user to the current word. if pressed backspace cannot go to prev word
      if (currCharIndex !== 0) {
        // backspace from last character
        if (currCharIndex === allChildrenSpans.length) {
          // if backspace on extra chars remove them from dom
          if (allChildrenSpans[currCharIndex - 1].className.includes("extra")) {
            allChildrenSpans[currCharIndex - 1].remove();
            allChildrenSpans[currCharIndex - 2].className += "right";
          } else {
            allChildrenSpans[currCharIndex - 1].className = "char current";
          }

          setCurrCharIndex(currCharIndex - 1);
          return;
        }

        allChildrenSpans[currCharIndex].className = "char";
        allChildrenSpans[currCharIndex - 1].className = "char current";
        setCurrCharIndex(currCharIndex - 1);
      }
      return;
    }

    // if user does not enter space to go to next word and keeps typing then we need to render in dom what they are typing
    // logic for typing extra characters - create spans
    if (currCharIndex === allChildrenSpans.length) {
      let newSpan = document.createElement("span");
      newSpan.innerText = e.key;
      newSpan.className = "char incorrect right extra";
      allChildrenSpans[currCharIndex - 1].className = allChildrenSpans[
        currCharIndex - 1
      ].className.replace("right", "");

      wordSpanRef[currWordIndex].current.append(newSpan);
      setCurrCharIndex(currCharIndex + 1);

      // for numbers - characters - extra
      setExtraChars(extraChars + 1);

      return;
    }

    // compare
    // logic for incorrect and correct chars
    if (e.key === allChildrenSpans[currCharIndex].innerText) {
      allChildrenSpans[currCharIndex].className = "char correct";
      
      // for wpm
      setCorrectChars(correctChars + 1);
    } else {
      allChildrenSpans[currCharIndex].className = "char incorrect";

      // for numbers - characters
      setIncorrectChars(incorrectChars + 1);
    }

    setCurrCharIndex(currCharIndex + 1);
    if (currCharIndex + 1 === allChildrenSpans.length) {
      allChildrenSpans[currCharIndex].className += " right";
    } else {
      allChildrenSpans[currCharIndex + 1].className = "char current";
    }
  };

  // changing the countdown value
  useEffect(() => {
    resetTest();
  }, [testTime, testMode, testWords]);

  const calculateWPM = () => {
    // return Math.round((correctChars / 5) / (testTime / 60));

    // will not work for words mode as testtime is different
    // graph data is filled every second, hence can calculate wpm through the last entry in graph data for time
    // [0] for saving it as first index, 0th index having the time and at first index having wpm. this was structuring of graph data. and graph data was starting from 0 hence added + 1 to get the total time for test completion
    return Math.round((correctChars / 5) / ((graphData[graphData.length - 1][0] + 1) / 60));
  }

  const calculateAccuracy = () => {
    return Math.round((correctWords / currWordIndex) * 100);
  }

  const resetTest = () => {
    setCurrCharIndex(0);
    setCurrWordIndex(0);
    setTestStart(false);
    setTestOver(false);
    // also when clicked on, timer should not automatically start
    clearInterval(intervalId);
    setCountDown(testTime);

    if (testMode === 'words') {
      let random = randomWords(testWords);
      setWordsArray(random);
      setCountDown(180);
    } else {  
      let random = randomWords(100);
      setWordsArray(random);
    }
    resetWordSpanRefClassNames();
  }

  useEffect(() => {
    focusInput();

    // to make visible cursor before 0th char at page reload
    wordSpanRef[0].current.childNodes[0].className = "char current";
  }, []);

  const focusInput = () => {
    inputTextRef.current.focus();
  };

  // things needed for graphdata -> correctchars to calculate wpm, 
  // inside the timer func we cannot directly access the state because the state value will not change there. so to access the updated state value we use callback func 

  const startTimer = () => {
    const intervalId = setInterval(timer, 1000);

    setIntervalId(intervalId);

    function timer() {
      setCountDown((prevCountDown) => {

        setCorrectChars((correctChars) => {
          // the formula will not run when testmode is words as prevcountdown is 180 and testTime will still be 15, 30, 60 sec. hence will go to negative
          // hence implement start time according to mode and make change in formula
          setGraphData((data) => {
            const startTime = (testMode === 'words') ? 180 : testTime;
            return [...data, [startTime - prevCountDown, Math.round((correctChars / 5) / ((startTime - prevCountDown + 1) / 60))]];
          })
          return correctChars;
        })

        // to stop the countDown
        if (prevCountDown === 1) {
          clearInterval(intervalId);
          setCountDown(0);
          setTestOver(true);
        } else {
          return prevCountDown - 1;
        }
      });
    }
  };

  return (
    <div>
      {testOver ? ( <Stats wpm={calculateWPM()} accuracy={calculateAccuracy()} graphData={graphData} correctChars={correctChars} incorrectChars={incorrectChars} extraChars={extraChars} missedChars={missedChars} /> ) : (
        <>
          <UpperMenu countDown={countDown} />
          <div className="type-box" onClick={focusInput}>
            <div className="words">
              {words.map((word, index) => (
                <span className="word" ref={wordSpanRef[index]} key={index}>
                  {word.split("").map((char, idx) => (
                    <span className="char" key={`char${idx}`}>
                      {char}
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        </>
      )}

      <input
        type="text"
        className="hidden-input"
        ref={inputTextRef}
        onKeyDown={(e) => handleOnKeyDown(e)}
      />
    </div>
  );
};

export default TypingBox;
