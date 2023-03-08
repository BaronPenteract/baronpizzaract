import React from 'react';
import { Outlet } from 'react-router-dom';

import './app.scss';

import Header from '../Header';
import Footer from '../Footer';

function App() {
  return (
    <div className="wrapper">
      <div className="content">
        <Header />
        <div className="container">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
