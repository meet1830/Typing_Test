import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    *, *::after, *::before {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }

    body {
        background: black;
        color: white;
        transition: all 0.25s linear;
        // transition for anything that happens in the body
    }

    .canvas {
        display: grid;
        grid-auto-flow: row; 
        // grid now divided into rows
        grid-template-row: auto 1fr auto; 
        // adjust the height of row automatically according to the content
        min-height: 100vh;
        gap: 0.5rem;
        padding: 1rem;
        width: 100vw;
        align-items: center;
    }

    .type-box {
        display: block;
        max-width: 1000px; //to avoid overflow
        height: 140px;
        position: relative;
        margin-left: auto;
        margin-right: auto;
        overflow: hidden;
    }

    .words {
        font-size: 30px;
        display: flex;
        flex-wrap: wrap;
        align-contentt: center;
        width: 100%;
    }

    .word {
        margin: 5px;
        padding-right: 2px;
    }

    .hidden-input {
        opacity: 0;
    }

    .correct {
        color: green;
    }

    .incorrect {
        color: red;
    }

    // implementing cursor
    .current {
        border-left: 1px solid;
        animation: blinking 2s infinite;
        animation-timing-function: ease;

        // blinking animation
        @keyframes blinking {
            0% {border-left-color: #fff;}
            25% {border-left-color: black;}
            50% {border-left-color: #fff;}
            75% {border-left-color: black;}
            100% {border-left-color: #fff;}
        }
    }

    .right {
        border-right: 1px solid;
        animation: blinkingRight 2s infinite;
        animation-timing-function: ease;

        // blinking animation
        @keyframes blinkingRight {
            0% {border-right-color: #fff;}
            25% {border-right-color: black;}
            50% {border-right-color: #fff;}
            75% {border-right-color: black;}
            100% {border-right-color: #fff;}
        }
    }
`;
