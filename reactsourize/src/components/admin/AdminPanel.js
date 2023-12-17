// AdminPanel.js

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLeftMenu from './AdminLeftMenu';

const AdminPanel = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const isAuthorizedUser =
      localStorage.getItem('email') === 'tugruldonmez23@gmail.com' &&
      localStorage.getItem('password') === '12345';

    if (!isAuthenticated || !isAuthorizedUser) {
      // Redirect to /admin if not authenticated or not authorized
      navigate('/admin');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex bg-gray-200">
      <AdminLeftMenu/>
    </div>
  );
};

export default AdminPanel;
