import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';
import { exportClickedPostId } from '../base/base'; // Assuming base.js is in the same directory

function Leftmain({}) {
  const [topics, setTopics] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = topics.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(topics.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handlePostClick = (postId) => {
    // Pass the clicked post's ID to the exportClickedPostId function in base.js
    exportClickedPostId(postId);
  };

  return (
    <div className='bg-[#f8f8f8] rounded-md shadow-gray-500 shadow-sm'>
      <h2 className='text-center bg-orange text-gray-50 text-md font-medium rounded-t-md'>
        Gündemdekiler
      </h2>
      <ul>
        <div>
          {currentItems.map((topic) => (
            <li
              className='border-b-2 pt-2 pr-2 pl-2 border-gray-400 text-sm font-normal font-sans'
              key={topic.id}
            >
              <a href={`http://localhost:8080/api/getPosts/${topic.id}`} onClick={() => handlePostClick(topic.id)}>
                <strong>{topic.title}</strong>
                <p className=' text-2xs font-mono'>Çekilme tarihi:{topic.updatedTime}</p>
              </a>
            </li>
          ))}
        </div>
      </ul>
      <div className='flex justify-between items-center mt-2 border-t p-2'>
        <p className='text-2xs text-gray-500 flex items-center'>
          Gündemdekiler 24 saatte bir yenilenmektedir
        </p>
        <div className='flex'>
          {currentPage > 1 && (
            <button
              className='bg-blue-500 text-white px-2 py-1 rounded-md mr-2'
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>
          )}
          {currentPage < totalPages && (
            <button
              className='bg-blue-500 text-white px-2 py-1 rounded-md'
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Leftmain;