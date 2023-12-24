import './Admin.css'
import info from "../img/info.png"
import del from "../img/delete.png"
import {  ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect } from "react";
const YorumPanel = () => {
    const [newsComments, setNewsComments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/admin/getAllCommentsWithDetails');
        const data = await response.json();
     
        
        // Assuming data is an array of comments, set the state to the array of comments
        setNewsComments(data);
      } catch (error) {
        console.error('Error fetching news comments:', error);
      }
    };

    fetchData(); // Call the function to fetch data when the component mounts
  }, []); 
  const handleDelete = async (commentId) => {
    try {
    
      // Make a DELETE request to the delete endpoint
      await fetch(`http://localhost:8080/admin/deleteComment/${commentId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // You might need to include additional headers if required by your API
        },
      });
  
      // After successful deletion, fetch the updated comments
      const response = await fetch('http://localhost:8080/admin/getAllCommentsWithDetails');
      const data = await response.json();
      
      // Set the state to the array of updated comments
      setNewsComments(data);
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <div className="bg-gray-100 rounded-md w-11/12 h-11/12 flex">
      <div className="flex flex-wrap w-full items-center justify-center">
        <h1 className="text-2xl text-gray-700">Yorum İşlemleri</h1>
        <div className="w-full h-11/12 items-center justify-center flex">
          <div className="rounded-md w-11/12 h-11/12 bg-gray-200 overflow-auto">
            <div className="w-full h-fit">
              <ul>
                {newsComments.map((comment, index) => (
                  <li key={index} className="items-center rounded-md bg-gray-150 m-1 p-1 text-gray-700 flex">
                    <div className=" flex pb-2 items-center w-full">
                      <div className=' w-full bg-gray-50 rounded-md'>
                        <div className=' flex justify-between'>
                          <p className='text-2xs m-1 font-bold'>Gündem:{comment.title}</p>
                          <p className='text-2xs m-1 font-normal font-mono'>at {comment.createdAt}</p>
                        </div>
                        <p className=' w-fit m-2 p-1 text-sm font-semibold bg-blue-950 text-white rounded-md'>{`u/${comment.firstName} ${comment.lastName}`}</p>
                        <p className='text-base m-1 p-2 font-normal text-adminmenu bg-gray-200 rounded-md'>
                          {comment.content}
                        </p>
                      </div>
                      <button
                        className="text-sm font-medium flex items-center w-fit h-fit p-2 bg-red-700 hover:bg-red-600 rounded-lg text-gray-200 hover:text-white hover:shadow-2xl hover:shadow-adminmenu"
                        onClick={() => handleDelete(comment.id)}>
                        <img src={del} className="mr-2" style={{ width: '13px', height: '13px' }} alt="Delete"></img>
                        Sil
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default YorumPanel;