import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { ThemeProvider, CSSReset, ColorModeProvider } from '@chakra-ui/core';
import Thunk from 'redux-thunk';
import App from './App';
import rootReducer from './modules';

const store = createStore(rootReducer, applyMiddleware(Thunk));

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider>
      <ColorModeProvider>
        <CSSReset />
        <App />
      </ColorModeProvider>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
