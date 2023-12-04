    import React, { useState, useEffect } from 'react';
    import axios from 'axios';
    import { useNavigate } from 'react-router-dom';
    import Modal from 'react-modal';
    import Auth from '../user/Auth';

    Modal.setAppElement('#root'); // Varsayılan olarak root elementi

    function Leftmain({ userId, selectedItems, onSelectPost }) {
      const [topics, setTopics] = useState([]);
      const [currentPage, setCurrentPage] = useState(1);
      const itemsPerPage = 10;
      const navigate = useNavigate();
      const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

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
        // Kullanıcı giriş yapmış mı kontrol et
        const isUserLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

        if (isUserLoggedIn) {

          onSelectPost(postId);
        } else {
          // Kullanıcı giriş yapmamışsa alert göster
          alert('Giriş yapmalısınız!');
        }
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
                  className={`border-b-2 pt-2 pr-2 pl-2 border-gray-400 text-sm font-normal font-sans cursor-pointer`}
                  key={topic.id}
                  onClick={() => handlePostClick(topic.id)}
                >
                  <div>
                    <strong>{topic.title}</strong>
                    <p className='text-2xs font-mono'>Çekilme tarihi: {topic.updatedTime}</p>
                  </div>
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

          {/* Kullanıcı giriş yapma modal'ı */}
          <Modal
            isOpen={isLoginModalOpen}
            onRequestClose={() => setIsLoginModalOpen(false)}
            style={{
              content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
              },
            }}
          >
            <Auth onClose={() => setIsLoginModalOpen(false)} onLoginSuccess={() => setIsLoginModalOpen(false)} />
          </Modal>

        </div>
      );
    }

    export default Leftmain;
