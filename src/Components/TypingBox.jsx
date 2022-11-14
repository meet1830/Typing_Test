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
  const [countDown, setCountDown] = useState(15);
  const [testStart, setTestStart] = useState(false);
  const [testOver, setTestOver] = useState(false);

  const inputTextRef = useRef(null);

  const {testTime} = useTestMode();
  const [intervalId, setIntervalId] = useState(null);

  // to find wpm
  // can count the correct words typed while refering - query selector it in space logic
  // other method - can decide at the change of color
  // going with the second method
  const [correctChars, setCorrectChars] = useState(0);

  // to find accuracy
  // check this when switching between words - at logic space
  // same logic as above method 1
  const [correctWords, setCorrectWords] = useState(0);

  // the words array will be a state
  const [wordsArray, setWordsArray] = useState(() => {
    return randomWords(100);
    // can initialize random words with a value like 100 or can add a callback function
  })

  // layer of optimization
  // usememo - callback func as first parameter and useeffect as second same as useeffect
  // similar to useEffect - when dependency changes it runs. butt useeffect also runs when the component is mounted, but usememo runs only when it is initialized and offers a bit of optimization on top of it
  const words = useMemo(() => {
    return wordsArray;
    // this is how wordsarray is initialized
  }, [wordsArray]);

  // also initialize wordspanref using usememo
  const wordSpanRef = useMemo(() => {
    // dependency is words array so when wordsarray changes, words changes and then wordspanref changes
    // so wordspanref is not created beforehand only when it changes it is created, so no undefined error 
    return Array(words.length).fill(0).map((i) => createRef(null));
  }, [words]);

  // const wordSpanRef = Array(words.length)
  //   .fill(0)
  //   .map((i) => createRef(null));

  // memoization means caching some value so that it does not gets evaluated again. so usememo caches the return value. so we think that some func will run on its own and arbitrarily then we use usememo. so value does not recalculate and saves time

  // from reset func
  const resetWordSpanRefClassNames = () => {
    wordSpanRef.map(i =>{ 
      Array.from(i.current.childNodes).map(j => {
        j.className = 'char';
      })
    });
    // nodelist does not have map function hence array.from. convert it to array
    // now call this function in reset function
    // to remove colors
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
    // just after declaring allchildrenspans, because will give error - not defined innertext if wrote after comparing function
    if (e.keyCode === 32) {
      // for accuracy
      // const incorrectChars = wordSpanRef[currWordIndex].current.querySelectorAll('.incorrect');
      // an array which contains all incorrect chars
      // dont use this as if user types space in middle of the word then also the word is correct.
      const correctChar = wordSpanRef[currWordIndex].current.querySelectorAll('.correct');
      if (correctChar.length === allChildrenSpans.length) {
        // correct typed === total words to type
        // then update the state
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
    if (currCharIndex === allChildrenSpans.length) {
      let newSpan = document.createElement("span");
      newSpan.innerText = e.key;
      newSpan.className = "char incorrect right extra";
      allChildrenSpans[currCharIndex - 1].className = allChildrenSpans[
        currCharIndex - 1
      ].className.replace("right", "");

      wordSpanRef[currWordIndex].current.append(newSpan);
      setCurrCharIndex(currCharIndex + 1);
      return;

      // now when user presses backspace on the extra characters entered then those characters should be removed from dom for that classname 'extra' and writing logic for that in logic for backspace
    }

    // compare
    if (e.key === allChildrenSpans[currCharIndex].innerText) {
      allChildrenSpans[currCharIndex].className = "char correct";
      
      // for wpm
      // counting correct chars
      // then through function calculating wpm
      setCorrectChars(correctChars + 1);
    } else {
      allChildrenSpans[currCharIndex].className = "char incorrect";
    }

    setCurrCharIndex(currCharIndex + 1);
    if (currCharIndex + 1 === allChildrenSpans.length) {
      allChildrenSpans[currCharIndex].className += " right";
    } else {
      allChildrenSpans[currCharIndex + 1].className = "char current";
    }
  };

  // changing the countdown value
  // every time test time changes, change the value in countdown
  useEffect(() => {
    // setCountDown(testTime);
    // putting this in resetTest function and calling resetTest func here
    resetTest();
  }, [testTime]);

  const calculateWPM = () => {
    // return using the formula
    return Math.round((correctChars / 5) / (testTime / 60));
    // pass this in the stats as prop
  }

  const calculateAccuracy = () => {
    // currwordindex = here total words typed - if at first index then typed 1 word
    return Math.round((correctWords / currWordIndex) * 100);
  }

  // when clicked on one of the three timers in between a game then the whole thing should reset, colors should go away
  const resetTest = () => {
    setCurrCharIndex(0);
    setCurrWordIndex(0);
    setTestStart(false);
    setTestOver(false);
    // also when clicked on, timer should not automatically start
    // hence create a state for that and clear setinterval using interval id 
    clearInterval(intervalId);
    setCountDown(testTime);

    // after this just add new words and clear the whole thing
    // for this whole wordspanref should change and words prop will change
    // hence becomes complex and hence use usememo here
    // removing words prop from here and not also not calling words now from app.js
    // will do this inside this file only and not get it as a prop
    let random = randomWords(100);
    setWordsArray(random);
    // now words are new every time we click on any timer 
    // typed styles remain same
    // we have changed the references but ref classes are still the same. if we change the value then ref is still present at same place. so how to change classnames
    // for this have to manually iterate over the row span and change the usememo
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

  const startTimer = () => {
    const intervalId = setInterval(timer, 1000);

    setIntervalId(intervalId);

    function timer() {
      setCountDown((prevCountDown) => {
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
      <UpperMenu countDown={countDown} />
      {testOver ? ( <Stats wpm={calculateWPM()} accuracy={calculateAccuracy()} /> ) : (
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
