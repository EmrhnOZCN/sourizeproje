// index.js

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BaseTemplate from './components/base/base';
import AdminLogin from './components/admin/AdminLogin';
import AdminPanel from './components/admin/AdminPanel';

ReactDOM.render(
  <Router>
    <Routes>
      {/* Route for the AdminLogin component */}
      <Route path="/admin/*" element={<AdminLogin />} />

      {/* Route for the AdminPanel component */}
      <Route path="/admin/panel" element={<AdminPanel />} />

      {/* Default route for the root path */}
      <Route path="/" element={<BaseTemplate/>} />

      {/* Additional routes for other admin pages can be added here */}
    </Routes>
  </Router>,
  document.getElementById('root')
);
