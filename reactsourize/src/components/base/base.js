    import React, { useState, useEffect } from 'react';
    import Modal from 'react-modal';
    import './base.css';
    import 'tailwindcss/tailwind.css';
    import SignUp from '../user/SignUp';
    import Auth from '../user/Auth';
    import Rightmain from '../Rightmain/rightmain';
    import Leftmain from '../Leftmain/leftmain';
    import Summaries from '../summaries/summaries';
    import { useNavigate } from 'react-router-dom';

    // App elementini belirle
    Modal.setAppElement('#root'); // Varsayılan olarak root elementi

    const BaseTemplate = React.memo(({ onLoginSuccess }) => {
      const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
      const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
      const [isLoggedIn, setIsLoggedIn] = useState(false);
      const [username, setUsername] = useState('');
      const [isSubSelectionModalOpen, setIsSubSelectionModalOpen] = useState(false);
      const [selectedSubs, setSelectedSubs] = useState([]);
      const [userIdforSelections, setUserIdForSelections] = useState(null); // Initialize user ID as null
      const [selectedPlatforms, setSelectedPlatforms] = useState([]);
      const [selectedPost, setSelectedPost] = useState(null);

      const navigate = useNavigate();

      // handleLoginSuccess fonksiyonunu useEffect kapsamı dışında tanımla
     const handleLoginSuccess = async (loginData) => {
         if (loginData.success) {
           setIsLoggedIn(true);
           setUsername(loginData.username);
           setUserIdForSelections(loginData.userId);

           setIsLoginModalOpen(false);
           setIsSignUpModalOpen(false);

           localStorage.setItem('isLoggedIn', 'true');
           localStorage.setItem('userId', loginData.userId);

           if (onLoginSuccess) {
             onLoginSuccess(loginData);
           }
         }
       };

       useEffect(() => {
         const storedLoggedIn = localStorage.getItem('isLoggedIn');
         const storedUserId = localStorage.getItem('userId');

         if (storedLoggedIn === 'true' && storedUserId) {
           setIsLoggedIn(true);
           setUserIdForSelections(storedUserId);
         }
       }, [onLoginSuccess]);


      const handleLoginModalOpen = () => {
        if (!isLoggedIn) {
          setIsLoginModalOpen(true);
        }
      };

      const handleLoginModalClose = () => {
        setIsLoginModalOpen(false);
      };

      const handlePostClick = (postId) => {
        setSelectedPost(postId);
      };

      const handleSignUpModalOpen = () => {
        if (!isLoggedIn) {
          // Open the sign-up modal only if the user is not logged in
          setIsSignUpModalOpen(true);
        }
      };

      const handleSignUpModalClose = () => {
        setIsSignUpModalOpen(false);
        setIsLoginModalOpen(true);
      };

      const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');

        // Use the navigate function to redirect to the homepage
        navigate('/');
      };

      const handleSubSelectionModalOpen = () => {
        setIsSubSelectionModalOpen(true);
      };

      const handleSubSelectionModalClose = () => {
        setIsSubSelectionModalOpen(false);
      };

      const handleSubSelectionUpdate = (selectedSubreddits) => {
        setSelectedSubs(selectedSubreddits);
        handleSubSelectionModalClose();
      };

      const toggleSelection = (platform) => {
        // Create a copy of the selected platforms array
        const updatedSelectedPlatforms = [...selectedPlatforms];

        if (updatedSelectedPlatforms.includes(platform)) {
          // If the platform is already selected, remove it
          const index = updatedSelectedPlatforms.indexOf(platform);
          updatedSelectedPlatforms.splice(index, 1);
        } else {
          // If the platform is not selected, add it
          updatedSelectedPlatforms.push(platform);
        }

        // Update the selectedPlatforms state with the updated array
        setSelectedPlatforms(updatedSelectedPlatforms);
      };

      return (
        <div>
          <body className='base-template'>
            <div className='header-template sticky'>
              <a className='header-logo-template xs:w-1/4 sm:w-2/12 lg:w-1/12' href='#'>
                <span className='header-logo-version-template'> v.0.0</span>
              </a>
              {isLoggedIn ? (
                <>
                  <div id='buttonsloggedin' className=' xs:w-1/4 sm:w-4/12 lg:w-2/12'>
                    <button className='buttons xs:w-1/2' onClick={handleSubSelectionModalOpen}>
                      Ayarlar
                    </button>
                    {/* Logout button */}
                    <button className='buttons xs:w-1/2' onClick={handleLogout}>
                      Çıkış Yap
                    </button>
                  </div>
                </>
              ) : (
                <div className='navbar-contents'>
                  <button className='buttons' onClick={handleLoginModalOpen}>
                    Giriş Yap
                  </button>
                  <button className='buttons' onClick={handleSignUpModalOpen}>
                    Kayıt Ol
                  </button>
                </div>
              )}
            </div>

            <main className='main-template justify-center'>
              <div id="leftdiv" className="w-2/12 h-full mx-2 bg-[#f8f8f8] rounded-md shadow-gray-500 shadow-sm">
                <Leftmain onSelectPost={handlePostClick} />
              </div>
              <div id="middlediv" className="w-4/12 h-full">
                <div id="searchbarsdiv" className="py-2 bg-[#f8f8f8] rounded-md shadow-gray-500 shadow-sm">
                  <form>
                    <div className="flex justify-center ">
                      <div className="relative w-8/12">
                        <input type="search" id="search-dropdown" className="rounded-lg block p-2.5 w-full z-20 text-sm text-gray-900 bg-reddit-grisi focus:ring-light-orange outline-none" placeholder="Ara.." required></input>
                        <button type="submit" className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-orange rounded-r-lg transition duration-300 ease-in-out hover:shadow-lg hover:shadow-orange">
                          <svg className="w-4 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                          </svg>
                          <span className="sr-only">Search</span>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                <div>
                  <div className=' my-2'>
                  <Summaries postId={selectedPost} userId={userIdforSelections} />


                  </div>
                </div>
              </div>
              <div id="rightdiv" className="bg-white w-2/12 h-full mx-2 bg-[#f8f8f8] rounded-md shadow-gray-500 shadow-sm">
                <Rightmain userId={userIdforSelections} selectedItems={selectedSubs} />
              </div>

              <div className='main-content-template'>

              </div>
            </main>

            <Modal isOpen={isLoginModalOpen} onRequestClose={handleLoginModalClose} contentLabel='Giriş Yap Modalı' style={{
              overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)', // Background color of the overlay
                zIndex: 1000, // Z-index of the overlay
              },
              content: {
                // Styling for the modal content
                width: '50%',
                maxHeight: '80%',
                margin: '0 auto',
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '20px',
                backgroundColor: '#e8dfd6',
              },
            }}>
              <Auth onClose={handleLoginModalClose} onLoginSuccess={handleLoginSuccess} />
            </Modal>

            <Modal isOpen={isSignUpModalOpen} onRequestClose={handleSignUpModalClose} contentLabel='Kayıt Ol Modalı' style={{
              overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)', // Background color of the overlay
                zIndex: 1000, // Z-index of the overlay
              },
              content: {
                // Styling for the modal content
                width: '50%',
                maxHeight: '80%',
                margin: '0 auto',
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '20px',
                backgroundColor: '#e8dfd6',
              },
            }}>
              <SignUp onClose={handleSignUpModalClose} />
            </Modal>

            <Modal isOpen={isSubSelectionModalOpen} onRequestClose={handleSubSelectionModalClose} contentLabel='Subreddit Seçim Modalı' style={{
              overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.3)', // Background color of the overlay
                zIndex: 1000, // Z-index of the overlay
              },
              content: {
                // Styling for the modal content
                width: '50%',
                maxHeight: '80%',
                margin: '0 auto',
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '20px',
                backgroundColor: 'white',
              },
            }}>
              {/* <SubSelections userId={userIdforSelections} selectedItems={selectedSubs} onUpdateSelectedItems={handleSubSelectionUpdate} /> */}
            </Modal>
          </body>
        </div>
      );
    });

    let clickedPostId;

    export const exportClickedPostId = (postId) => {
      clickedPostId = postId;
      // You can perform any other logic you need here
      console.log('Clicked Post ID:', clickedPostId);
    };

    // You can export other functions or variables if needed

    export default BaseTemplate;
