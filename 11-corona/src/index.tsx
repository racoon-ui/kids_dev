import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { createStore, applyMiddleware, compose } from 'redux';
import { ThemeProvider, CSSReset, ColorModeProvider } from '@chakra-ui/core';
import Thunk from 'redux-thunk';
import App from './App';
import rootReducer from './modules';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(Thunk)));

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider>
      <ColorModeProvider>
        <CSSReset />
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </ColorModeProvider>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
