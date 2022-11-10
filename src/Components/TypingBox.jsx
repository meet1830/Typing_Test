import React from "react";
import { useState } from "react";
import { createRef } from "react";
import { useEffect } from "react";
import { useRef } from "react";

const TypingBox = ({ words }) => {
  const inputTextRef = useRef(null);
  // useref returns an object which has a current property which contains html for the element we want to refer to. replacement for document.querySelector

  const handleOnKeyDown = (e) => {
    console.log("Key pressed: " + e.key);

    // access the char of current word and check comparing with key pressed
    let allChildrenSpans = wordSpanRef[currWordIndex].current.childNodes;
    if (e.key === allChildrenSpans[currCharIndex].innerText) {
      console.log("user pressed the correct key");
      // change the classname for styling
      allChildrenSpans[currCharIndex].className='char correct';
    } else {
      console.log("user pressed incorrect key");
      // change styling
      allChildrenSpans[currCharIndex].className="char incorrect";
    }

    // update currcharindex to next char of curr word
    setCurrCharIndex(currCharIndex + 1);

    // logic for pressing spacebar


    // logic for pressing backspace

  }

  // always keep focus on the input tag so that we can capture what user types
  // keep input on focus on page reload
  useEffect(() => {
    focusInput();
  }, []);

  const focusInput = () => {
    // use the ref defined for input element
    inputTextRef.current.focus();
    // also when user clicks anywhere then the element is out of focus. hence make onclick on the textbox to invoke this function to bring the input back to focus
  }

  // to now match what the user types to the chars we have. refering each char that we have:
  // const wordsSpanRef = Array(words.length).fill(0).map(i => useRef());
  // gives error. cannot use hooks inside callback functions. it can only be called inside functional based components
  // in this case, createRef has to be used. same working as useref, but is a function unlike useref hook so can be used inside callback function
  const wordSpanRef = Array(words.length).fill(0).map(i => createRef(null));
  // wordspanref will be a reference array. length same as words array but will contain refs to the chars. initialized with null
  // wordspanref = [{current: null}, {current: null}...]
  // if fill not written then an empty array is initialised and map function cannot be run on empty object so current property will not show up
  // use the index of word to provide ref to each word
  
  const [currWordIndex, setCurrWordIndex] = useState(0);
  const [currCharIndex, setCurrCharIndex] = useState(0);
  // using two states because - wordindex get the current word index. charindex get the index of the current char of the current word
  
  // to get access to the current char - two methods. 
  // first method - console.log(wordspanref) and inside each word - current - there is a property childNodes. It contains ref to each char span - type inside onkeydown function:
  /* let allChildrenSpans = wordSpanRef[currWordIndex].current.childNodes;
    console.log("children spans", allChildrenSpans); 
  */
  // second method - type inside onkeydown function 
  /* let allChildrenSpans = wordSpanRef[currWordIndex].current.querySelectorAll('span');
    console.log("children spans", allChildrenSpans); 
    console.log("current present character", allChildrenSpans[currCharIndex].innerText) -> gives the current character inside current word
  */
  // will give the nodelist object in console which contains ref to each char


  return (
    <div>
      <div className="type-box" onClick={focusInput} >
        <div className="words">
          {/* generating random words, spans or words and chars go here */}
          {words.map((word, index) => (
            <span className="word" ref={wordSpanRef[index]} >
              {/* now each word is a span */}
              {/* {word} */}
              {/* mapping ahead to change each word into spans of chars */}
              {word.split("").map((char, idx) => (
                <span className="char">{char}</span>
              ))}
            </span>
          ))}
        </div>
      </div>
      {/* below input to take user input, hiding it to the user using css */}
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
