// Importovanie potrebnych packages
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './redux/store';

// Importovanie nasej React aplikacie
import App from './App';

import * as serviceWorker from './serviceWorker';

// Disable react-dev-tools for production environment
if (
  process.env.NODE_ENV === 'production' &&
  typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ === 'object'
) {
  for (let [key, value] of Object.entries(
    window.__REACT_DEVTOOLS_GLOBAL_HOOK__
  )) {
    window.__REACT_DEVTOOLS_GLOBAL_HOOK__[key] =
      typeof value == 'function' ? () => {} : null;
  }
}

// Vytvorenie ReactDOM, Store pre real-time data, BrowserRouter pre routing v nasej aplikacii
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  // Prilepenie ReactDOM k id: `root` v nasom index.html dokumente
  document.getElementById('root')
);

serviceWorker.unregister();
