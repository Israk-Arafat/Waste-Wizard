import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './pages/home';
import Rules from './pages/rule';
import AppLayout from './components/AppLayout';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<App />} />
          <Route path="rules" element={<Rules />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
