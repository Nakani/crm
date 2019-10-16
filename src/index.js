import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Store from './reduxs/store-config';
import Router from './Router';

ReactDOM.render(
  <BrowserRouter>
    <Provider store={Store}>
      <Router />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
serviceWorker.unregister();
