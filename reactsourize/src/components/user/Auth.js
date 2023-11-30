import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../base/base.css';

const Auth = ({ onClose, onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const loginResponse = await axios.post('http://127.0.0.1:3001/users/login', {
        username,
        password,
      });

      if (!loginResponse.data.success) {
        throw new Error('Failed to log in. Please try again.');
      }

      // Fetch additional user data based on the logged-in user's email
      const userDataResponse = await axios.get(`http://127.0.0.1:3001/users/email/${username}`);
      const userData = userDataResponse.data;

      const loginData = {
        success: true,
        id: userData.user.id,
        username: userData.user.username,
      };

      console.log(loginData);
      onLoginSuccess(loginData);

      alert(`Başarıyla giriş yaptınız. Hoş geldiniz, ${loginData.username}!`);
      onClose();
      navigate('/');
    } catch (error) {
      alert('Geçersiz e-posta veya şifre. Lütfen tekrar deneyin.');
    }
  };

  return (
    <div className='auth-modal'>
      <div className='login-modal'>
        <h2 className="better-htags">Giriş Yap</h2>
        <form onSubmit={handleLogin}>
          <div className='form-group'>
            <label className='better-labels' htmlFor='username'>E-mail:</label>
            <input className='better-inputs' type='email' id='username' value={username} onChange={handleUsernameChange} />
          </div>
          <div className='form-group'>
            <label className='better-labels' htmlFor='password'>Şifre:</label>
            <input className='better-inputs' type='password' id='password' value={password} onChange={handlePasswordChange} />
          </div>
          <button className='buttons' type='submit'>Giriş Yap</button>
          <button className='buttons' type='button' onClick={onClose}>
            Kapat
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
