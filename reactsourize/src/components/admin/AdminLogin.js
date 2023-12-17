// AdminLogin.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    // Check if email and password match the credentials
    if (email === 'tugruldonmez23@gmail.com' && password === '12345') {
      // Clear any previous errors
      setError('');

      // Set authentication and user credentials in localStorage
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);

      navigate('/admin/panel');
    } else {
      setError('Invalid email or password');
    }
  };

  // Bu kısım eklenmiştir
  const handleBeforeUnload = () => {
    // Remove email and password from localStorage when the page is closed
    localStorage.removeItem('email');
    localStorage.removeItem('password');
  };

  // Etkinlik dinleyicisini ekleyin
  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Temizleme fonksiyonunu kaldırın
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []); // Boş bağımlılık dizisi sayesinde, sadece bir kere etkinleştirilecek

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="max-w-md w-full space-y-8">
        <div className=''>
          <h2 className="mt-6 text-center text-3xl font-bold font-sans text-gray-900">Admin Girişi</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only font-sans">
                E-mail
              </label>
              <input
                id="email"
                name="email"
                type="text"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only font-sans">
                Şifre
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="button"
              className=" font-sans group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handleLogin}
            >
              Giriş
            </button>
          </div>
        </form>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    </div>
  );
};

export default AdminLogin;
