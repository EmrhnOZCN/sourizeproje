import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';

function Rightmain({ userId }) {
  const [popularSubreddits, setPopularSubreddits] = useState([]);

  const fetchPopulars = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:3001/subreddits`);
      const sortedSubreddits = response.data.sort((a, b) => b.count - a.count);
      setPopularSubreddits(sortedSubreddits);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPopulars();
  }, []);
      return (
        <div className='bg-[#f8f8f8] rounded-md shadow-gray-500 shadow-sm'>
          <h2 className='text-center bg-orange text-gray-50 text-md font-medium rounded-t-md'>Popüler Subredditler</h2>
          <ul className=''>
            {popularSubreddits.map((subreddit) => (
              <div key={subreddit._id}>
                <li className='text-md text-black font-normal mt-1 ml-2'>
                  <span className='text-orange font-bold'>r/&nbsp;</span>
                  <span className='text-black'>{subreddit.subreddit}</span>
                </li>
              </div>
            ))}
          </ul>
          <div className=' mt-2 border-t p-2'>
              <p className='text-2xs text-gray-500'>En çok tercih edilen Subredditler</p>
          </div>
        </div>

      );
}

export default Rightmain;