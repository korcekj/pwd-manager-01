import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: 'Quicksand', sans-serif;
    background-color: #fff;
    color: #333;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  /* MODAL */
  .ReactModal__Overlay {
    z-index: 10;
  }

  .ReactModal__Body--open {
    overflow-y: hidden;
  }

  .ReactModal__Overlay--after-open {
    background-color: rgba(208, 232, 240, 0.4) !important;
  }

  .ReactModal__Content {
    padding: 1em 1.5em !important;
    display: inline-block;
    top: 50% !important;
    left: 50% !important;
    right: unset !important;
    bottom: unset !important;
    border: 2px solid rgba(0, 75, 95, 0.4) !important;
    border-radius: 6px;
    transform: translate(-50%, -50%);
  }
`;
