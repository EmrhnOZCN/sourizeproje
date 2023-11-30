import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import'../base/base.css';
import axios from 'axios';

const SignUp = ({ onClose }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/public/register', {
        firstName,
        lastName,
        username,
        password,
        authorities: ['ROLE_USER'],
      });

      // Check the response status
      if (response.status !== 200) {
        throw new Error('Failed to sign up. Please try again.');
      }

      // Handle successful sign-up
      onClose();
      alert(`Successfully signed up as ${username}!`);
      navigate('/');
    } catch (error) {
      alert(error.message || 'Something went wrong. Please try again.');
    }
  };

  // Assuming you have corresponding state setters like setUsername, setPassword, etc.
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  return (
    <div className="signup-modal">
      <h2 className='better-htags'>Kayıt Ol</h2>
      <form onSubmit={handleSignUp}>
        <div className="form-group">
          <label className='better-labels' htmlFor="email">İsim: </label>
          <input className='' type="text" id="firstName" value={firstName} onChange={handleFirstNameChange} />
        </div>
        <div className="form-group">
          <label className='better-labels' htmlFor="email">Soyisim: </label>
          <input className='' type="text" id="lastName" value={lastName} onChange={handleLastNameChange} />
        </div>
        <div className="form-group">
          <label className='better-labels' htmlFor="firstName">E-mail: </label>
          <input className='' type="text" id="username" value={username} onChange={handleUsernameChange} />
        </div>

        <div className="form-group">
          <label className='better-labels' htmlFor="password">Şifre: </label>
          <input className='' type="password" id="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button className='buttons' type="submit">Kayıt Ol</button>




      </form>
    </div>
  );
};

export default SignUp;
