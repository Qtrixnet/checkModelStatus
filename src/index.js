import './vendor/fonts.css'
import './vendor/normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './components/App/App'
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);