import { createGlobalStyle } from "styled-components";
// placing it at the top of the App.js file, the styles will be applied to all the components after it
// writing normal css only but it is served using styled components using global styles

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
`;
