import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './output.css'
import { Provider } from 'react-redux';
import { store } from './app/store';
import { BrowserRouter } from 'react-router';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Provider store={store}>
    <App />
    </Provider>
  </BrowserRouter>
);

