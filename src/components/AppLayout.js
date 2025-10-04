import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import '../pages/css/home.css';

const AppLayout = () => (
  <div className="App">
    <Navigation />
    <div className="content">
      <Outlet />
    </div>
  </div>
);

export default AppLayout;
