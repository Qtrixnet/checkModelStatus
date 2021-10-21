import './vendor/fonts.scss'
import './vendor/normalize.scss';
import App from './components/App/App'
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);