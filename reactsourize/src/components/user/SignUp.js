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
    <div className="w-full h-full bg-white rounded-2xl relative">
      {/* Close button */}
      <button
        className="absolute top-2 right-4 text-gray-500 hover:text-gray-700 text-2xl font-mono font-extrabold"
        onClick={onClose}
      >
        X
      </button>
      {/* Filigree overlay
      <div className="bg-filigree-once"></div> */}
      <div id='toptext' className='pt-2'>
        <h1 className='uppercase font-medium text-center text-3xl mt-8'>Kaydol</h1>
        <h3 className='font-thin text-center text-sm'><i>Özetleri görüntülemek için hesap oluşturmanız lazım.</i></h3>
      </div>
      <form onSubmit={handleSignUp} className=' pl-4 pt-4'>
        <div className="form-group">
          <label className='better-labels' htmlFor="email">İsim </label>
          <input className='better-inputs' type="text" id="firstName" value={firstName} onChange={handleFirstNameChange} />
        </div>
        <div className="form-group">
          <label className='better-labels' htmlFor="email">Soyisim </label>
          <input className='better-inputs' type="text" id="lastName" value={lastName} onChange={handleLastNameChange} />
        </div>
        <div className="form-group">
          <label className='better-labels' htmlFor="firstName">E-mail </label>
          <input className='better-inputs' type="text" id="username" value={username} onChange={handleUsernameChange} />
        </div>

        <div className="form-group">
          <label className='better-labels' htmlFor="password">Şifre </label>
          <input className='better-inputs' type="password" id="password" value={password} onChange={handlePasswordChange} />
        </div>
        <div className='text-center'>
          <button className='buttons ' type="submit">Kaydol</button>
        </div>
        
      </form>
    </div>
  );
};

export default SignUp;
