import React from 'react';
import ReactDOM from 'react-dom/client';
import './scss/app.scss';
import App from './components/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
