import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../base/base.css';

// ... (import statements remain unchanged)

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
      const loginResponse = await axios.post('http://localhost:8080/public/login', {
        username,
        password,
      });

      if (loginResponse.status === 200) {
        // Başarılı giriş
        const loginData = {
          success: true,
          userId: loginResponse.data.userId,
          firstName:loginResponse.data.firstName,
          lastName:loginResponse.data.lastName,// Assuming the userId is present in the response
        };

        console.log(loginData);
        onLoginSuccess(loginData);

        // Save userId in localStorage
        localStorage.setItem('userId', loginData.userId);
        localStorage.setItem('firstName', loginData.firstName);
        localStorage.setItem('lastName', loginData.lastName);

        alert(`Başarıyla giriş yaptınız. Hoş geldiniz, ${loginData.firstName + loginData.lastName }!`);
        onClose();

        // Anasayfaya yönlendirme
       navigate(`/${loginData.userId}`);
      } else {
        // Giriş başarısız
        throw new Error('Failed to log in. Please try again.');
      }
    } catch (error) {
      console.error('Error during login request:', error);

      if (error.response && error.response.status === 400) {
        // Hatalı şifre durumu
        alert('Geçersiz e-posta veya şifre. Lütfen tekrar deneyin.');
      } else if (error.response && error.response.status === 404) {
        // Kullanıcı bulunamadı durumu
        alert('Kullanıcı bulunamadı. Lütfen kayıt olun.');
      } else {
        // Diğer hatalar
        alert('Giriş sırasında bir hata oluştu. Lütfen tekrar deneyin.');
      }
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
