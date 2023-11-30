import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import'../base/base.css';
import axios from 'axios';

const SignUp = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);


  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:3001/users/signup', {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          email,
          password,
          selectedItems
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to sign up. Please try again.');
      }
      const dataToSendDjango = {
        "old_pref":[],
        "curr_pref": selectedItems,
      };
      try {
        await axios.post('http://localhost:8000/ScrapeReddit/add_subreddits/', dataToSendDjango);
        console.log('Data sent successfully!');
      } catch (error) {
        console.error('Error sending data:', error);
      }

      if (!response.ok) {
        throw new Error('Failed to sign up. Please try again.');
      }

      // Handle successful sign-up
      // For example, you can set the user as logged in using your auth context
      // For now, let's just close the modal and navigate to the homepage after sign-up
      onClose();
      alert(`Successfully signed up as ${username}!`);
      navigate('/');
    } catch (error) {
      alert(error.message || 'Something went wrong. Please try again.');
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSelectedItems = (selectedItems) => {
    setSelectedItems(selectedItems); // Update the selectedItems state
  };
  return (
    <div className="signup-modal">
      <h2 className='better-htags'>Kayıt Ol</h2>
      <form onSubmit={handleSignUp}>
        <div className="form-group">
          <label className='better-labels' htmlFor="username">Kullanıcı Adı: </label>
          <input className='' type="text" id="username" value={username} onChange={handleUsernameChange} />
        </div>
        <div className="form-group">
          <label className='better-labels' htmlFor="email">E-posta: </label>
          <input className='' type="email" id="email" value={email} onChange={handleEmailChange} />
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
