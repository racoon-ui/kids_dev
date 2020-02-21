import React from 'react';
import { render } from 'react-dom';

import App from './App';
import rootReducer from './modules';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const store = createStore(rootReducer);

const rootElement = document.getElementById('root');
render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement,
);
