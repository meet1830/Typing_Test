import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    *, *::after, *::before {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }

    body {
        background: ${({theme}) => theme.background};
        color: ${({theme}) => theme.title};
        transition: all 0.25s linear;
        // transition for anything that happens in the body
        overflow-y: scroll;
    }

    body::-webkit-scrollbar {
        display: none;
        // hiding the scroll bar in the browser but scrolling ability present
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
        color: ${({theme}) => theme.typeBoxText};
    }

    .word {
        margin: 5px;
        padding-right: 2px;
    }

    .hidden-input {
        opacity: 0;
    }

    .correct {
        color: ${({theme}) => theme.title};
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
            0% {border-left-color: ${({theme}) => theme.title};}
            25% {border-left-color: ${({theme}) => theme.background};}
            50% {border-left-color: ${({theme}) => theme.title};}
            75% {border-left-color: ${({theme}) => theme.background};}
            100% {border-left-color: ${({theme}) => theme.title};}
        }
    }

    .right {
        border-right: 1px solid;
        animation: blinkingRight 2s infinite;
        animation-timing-function: ease;

        // blinking animation
        @keyframes blinkingRight {
            0% {border-right-color: ${({theme}) => theme.title};}
            25% {border-right-color: ${({theme}) => theme.background};}
            50% {border-right-color: ${({theme}) => theme.title};}
            75% {border-right-color: ${({theme}) => theme.background};}
            100% {border-right-color: ${({theme}) => theme.title};}
        }
    }

    .upper-menu {
        display: flex;
        max-width: 1000px;
        margin-left: auto;
        margin-right: auto;
        justify-content: space-between;
        font-size: 20px;
        padding: 1rem;
        color: ${({theme}) => theme.typeBoxText};
    }

    .counter {
        cursor: none;
    }

    .time-modes, .word-mode {
        display: flex;
    }

    .time, .no-of-words {
        margin-right: 15px;
    }

    .time:hover, .no-of-words:hover {
        color: ${({theme}) => theme.title};
        cursor: pointer;
    }

    .mode:hover {
        color: ${({theme}) => theme.title};
        cursor: pointer;
    }

    // styles for user numbers result
    .stats-box {
        display: flex;
        max-width: 1000px;
        height: auto;
        margin-left: auto;
        margin-right: auto;
    }

    .title {
        font-size: 20px;
        color: ${({theme}) => theme.typeBoxText};
    }

    .subtitle {
        font-size: 30px;
        color: ${({theme}) => theme.title};
    }

    .left-stats {
        width: 30%;
        padding: 30px;
    }

    .right-stats {
        width: 70%;
    }

    .header {
        display: flex;
        width: 1000px;
        margin-left: auto;
        margin-right: auto;
        justify-content: space-between;
        height: 60px;
    }

    .footer {
        display: flex;
        flex-direction: column;
        width: 1000px;
        margin-left: auto;
        margin-right: auto;
        justify-content: space-between;
        height: 60px;
        align-items: center;
    }

    .actual-footer {
        display: flex;
        justify-content: space-between;
        width: 1000px;
    }

    .hint {
        kbd {
            background-color: ${({theme}) => theme.title};
            color: ${({theme}) => theme.background};
            padding: 2.5px 5px;
            border-radius: 3px;
        }
    }

    .result-graph, .table {
        width: 1000px;
        margin: auto;
    }

    .user-profile {
        width: 1000px;
        margin: auto;
        display: flex;
        min-height: 15rem;
        border-radius: 30px;
        background: ${({theme}) => theme.typeBoxText};
    }


    .user {
        display: flex;
        width: 50%;
        justify-content: center;
        margin-top: 30px;
        margin-bottom: 30px;
        padding: 1rem;
        border-right: 2px solid;
    }

    .picture {
        width: 50%;
    }

    .info {
        width: 50%;
        margin-top: 1rem;
        font-size: 1.5rem;
        text-align: center;
        padding: 1rem;
    }

    .total-times {
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 3rem;
    }

    .center-of-screen {
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
    }

    .instruction {
        color: ${({theme}) => theme.title};
    }
`;
