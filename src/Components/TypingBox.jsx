import React from "react";
import { useState } from "react";
import { createRef } from "react";
import { useEffect } from "react";
import { useRef } from "react";

const TypingBox = ({ words }) => {
  const [currWordIndex, setCurrWordIndex] = useState(0);
  const [currCharIndex, setCurrCharIndex] = useState(0);
  // state for timer functionality
  const [countDown, setCountDown] = useState(15);
  const [testStart, setTestStart] = useState(false);
  const [testOver, setTestOver] = useState(false);

  const inputTextRef = useRef(null);

  const wordSpanRef = Array(words.length)
    .fill(0)
    .map((i) => createRef(null));

  const handleOnKeyDown = (e) => {
    // starting the timer when user starts typing
    // startTimer();
    // but if user types second char then timer is called again it all accumulates
    // hence create a state for that
    if (!testStart) {
      startTimer();
      setTestStart(true);
    }

    // access the char of current word and check comparing with key pressed
    let allChildrenSpans = wordSpanRef[currWordIndex].current.childNodes;

    // logic for pressing spacebar - if user enters spacebar
    // just after declaring allchildrenspans, because will give error - not defined innertext if wrote after comparing function
    if (e.keyCode === 32) {
      setCurrWordIndex(currWordIndex + 1);
      setCurrCharIndex(0);

      // logic for removing cursor from the curr word
      // remove the right cursor for prev word when we move on to the next word
      if (allChildrenSpans.length <= currCharIndex) {
        // here two possibilites
        // classname = 'char correct right' or 'char incorrect right'
        // can use if else here
        // but more efficient way using replace classname
        // or can use classlist
        allChildrenSpans[currCharIndex - 1].classList.remove("right");

        // allChildrenSpans[currCharIndex - 1].className = allChildrenSpans[currCharIndex - 1].className.replace("right", "");

        // will work only for the current word but since the function will invoke for the every word individually, it will work here
      } else {
        // current cursor should move to the next word, and also current cursor should get removed if hit space between the word
        allChildrenSpans[currCharIndex].className = allChildrenSpans[
          currCharIndex
        ].className.replace("current", "");
      }

      // add cursor to the next word
      wordSpanRef[currWordIndex + 1].current.childNodes[0].className =
        "char current";

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
      // change the classname for styling
      allChildrenSpans[currCharIndex].className = "char correct";
    } else {
      // change styling
      allChildrenSpans[currCharIndex].className = "char incorrect";
    }

    // update currcharindex to next char of curr word
    setCurrCharIndex(currCharIndex + 1);

    // move cursor with the typing
    // allChildrenSpans[currCharIndex + 1].className = 'char current';

    // now after the cursor has finished the last char of currword, it does not display any cursor. it should display cursor on the right of the last char (before space for next word). but gives error in console that index out of bound hence defined right class in styles. if cursor not pointing at last char then display normal left cursor
    if (currCharIndex + 1 === allChildrenSpans.length) {
      allChildrenSpans[currCharIndex].className += " right";
      // just adding classname instead of '=' because want classnames of color to stay and override or else last char will not have any color
      // allChildrenSpans[currCharIndex].className = 'char right';
    } else {
      allChildrenSpans[currCharIndex + 1].className = "char current";
    }
  };

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

    function timer() {
      // setCountDown(countDown - 1);
      // this will not work as setinterval does not execute function in the call stack it does it elsewhere hence have to use prev state of the state for that
      // passing callback in state gives prev state of it
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
      <h1>{countDown}</h1>
      {/* display typing box till timer running, else display test over */}
      {testOver ? (
        <h1>Test Over!</h1>
      ) : (
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
