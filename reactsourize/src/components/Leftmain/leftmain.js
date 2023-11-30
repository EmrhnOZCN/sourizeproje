import React, { useState, useEffect,useCallback } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';

function Leftmain({ userId }) {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/getTopics');
        setTopics(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className='bg-[#f8f8f8] rounded-md shadow-gray-500 shadow-sm'>
      <h2 className='text-center bg-orange text-gray-50 text-md font-medium rounded-t-md'>
        Gündemdekiler
      </h2>
      <ul>
        {topics.map((topic) => (
          <li key={topic.id}>
            <strong>{topic.title}</strong>
            <p>Updated Time: {topic.updatedTime}</p>
          </li>
        ))}
      </ul>
      <div className=' mt-2 border-t p-2'>
        <p className='text-2xs text-gray-500 flex items-center'>
          Gündemdekiler 24 saatte bir yenilenmektedir
        </p>
      </div>
    </div>
  );
}

export default Leftmain;
