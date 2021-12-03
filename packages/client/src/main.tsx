import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { app } from '@ariaket/core';
import App from './App';

console.log(app.name);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
