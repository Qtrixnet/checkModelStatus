import './vendor/fonts.scss'
import './vendor/normalize.scss';
import App from './components/App/App'
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

ReactDOM.render(
    <HashRouter>
      <App />
    </HashRouter>,
  document.getElementById('root')
);