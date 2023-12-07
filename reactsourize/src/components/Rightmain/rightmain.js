import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';

function Rightmain({ userId,onSelectPost }) {
  const [topics, setTopics] = useState([]);

  const handlePostClick = (postId) => {
    // Kullanıcı giriş yapmış mı kontrol et
    const isUserLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (isUserLoggedIn) {

      onSelectPost(postId);
    } else {
      // Kullanıcı giriş yapmamışsa alert göster
      alert('Giriş yapmalısınız!');
    }
  };
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:8080/api/getBestTopics');
          setTopics(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }, []);
      return (
        <div className='bg-[#f8f8f8] rounded-md shadow-gray-500 shadow-sm'>
          <h2 className='text-center bg-green-500 text-gray-50 text-md font-medium rounded-t-md'>Popüler Gündemler</h2>
          <ul className=''>
             {topics.map((topic) => (
                      <li key={topic.id}
                      onClick={() => handlePostClick(topic.id)} className='border-b-2 pt-2 pr-2 pl-2 border-gray-400 text-sm font-normal font-sans cursor-pointer'>
                        <strong>{topic.title}</strong>
                        <p className='text-2xs font-mono'>Updated Time: {topic.updatedTime}</p>
                      </li>
                    ))}
          </ul>
          <div className=' mt-2  p-2'>
              <p className='text-2xs text-gray-500'>En çok tercih edilen Gündemler</p>
          </div>
        </div>

      );
}

export default Rightmain;