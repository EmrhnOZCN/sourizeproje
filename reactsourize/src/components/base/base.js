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
    import logo from '../img/SOUR.png';
    import userIcon from '../img/user.png';
    import PremiumModalContent from '../premium/PremiumModalContent';

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
        const userId = localStorage.getItem('userId');
        const role = localStorage.getItem('role');
      const navigate = useNavigate();
  const [isDestekFormuOpen, setIsDestekFormuOpen] = useState(false);
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
      const handleLogoClick = (e) => {
        e.preventDefault(); // Prevent the default navigation behavior

            if (isLoggedIn) {
             navigate(`/${role}/kullanici#${userId}/`);
           }
           else{
           navigate(`/`);
           }
        // Reload the current page

        window.location.reload();
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
      };
      const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);

        const handlePremiumButtonClick = () => {
          setIsPremiumModalOpen(true);
          // Burada premium tuşuna tıklanınca gerçekleşecek işlemleri yapabilirsiniz
          // Örneğin:
          // handlePremiumFeatures();
        };

        const handlePremiumModalClose = () => {
          setIsPremiumModalOpen(false);
        };




      const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('tokenKey');
        localStorage.removeItem('lastName');
        localStorage.removeItem('userName');
        localStorage.removeItem('firstName');
        localStorage.removeItem('userId');
        localStorage.removeItem('role');
        localStorage.removeItem('selectPostId');
        localStorage.removeItem('postId');
        localStorage.removeItem('userId');

        // Use the navigate function to redirect to the homepage
        navigate('/');
        window.location.reload();
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
              <a className='header-logo-template xs:w-1/4 sm:w-2/12 lg:w-1/12' href='#' onClick={handleLogoClick}>
                <div>
                  <img src={logo} className=''></img>
                </div>
                <div className='items-end'>
                  <span className='header-logo-version-template'> v.1.0.0</span>
                </div>
              </a>
              {isLoggedIn ? (
                <>
                  <div id='buttonsloggedin' className=' xs:w-1/4 sm:w-4/12 lg:w-2/12'>
                   {role === 'ROLE_USER' && (
                          <button className='buttons xs:w-1/3' onClick={handlePremiumButtonClick}>
                            Premium
                          </button>
                        )}


                    {/* Logout button */}
                    <button className='buttons xs:w-1/3' onClick={handleLogout}>
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
              <div id="middlediv" className="w-6/12 h-full">
                <div id="searchbarsdiv" className="py-2 bg-[#f8f8f8] rounded-md shadow-gray-500 shadow-sm">
                  <form>
                    <div className="flex justify-center ">
                      <div className="relative w-8/12">
                        <input type="search" id="search-dropdown" className="rounded-lg block p-2.5 w-full z-20 text-sm text-gray-900 bg-reddit-grisi focus:ring-green-300 outline-none" placeholder="Ara.." required></input>
                        <button type="submit" className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-green-500 rounded-r-lg transition duration-300 ease-in-out hover:shadow-lg hover:shadow-green-500">
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
                <Rightmain userId={userIdforSelections} selectedItems={selectedSubs} onSelectPost={handlePostClick} />
              </div>
            </main>
 <Modal
        isOpen={isPremiumModalOpen}
        onRequestClose={handlePremiumModalClose}
        contentLabel='Premium İçerik Modalı'
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0)',
            zIndex: 1000,
          },
          content: {
            width: 'auto',
            maxWidth: '40%', // Örneğin '60%' olarak değiştirebilirsiniz.
            height: 'auto',
            maxHeight: '70vh',
            margin: '0 auto',
            border: 'none',
            borderRadius: '15px',
            backgroundColor: 'transparent',
            padding: 20,
            overflow: 'visible',
            position: 'relative', // Konum belirtilmeli
          },
        }}
      >
        {/* Kapatma tuşu */}
        <button onClick={handlePremiumModalClose} style={{ position: 'absolute', top: '20px', right: '30px', fontSize: '22px', cursor: 'pointer', padding: '10px', border: 'none', background: 'none', color: '#fff' }}>
          &#x2715; {/* Unicode karakteri: Çarpı işareti (X) */}
        </button>

        {/* Premium içeriği buraya ekleyin */}
        <PremiumModalContent />
      </Modal>
            <Modal isOpen={isLoginModalOpen} onRequestClose={handleLoginModalClose} contentLabel='Giriş Yap Modalı' style={{
              overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)', // Set background color to transparent
                zIndex: 1000,
              },
              content: {
                width: 'auto', // Let the width be determined by content
                maxWidth: '30%',
                height: 'auto', // Let the height be determined by content
                maxHeight:'60vh',
                margin: '0 auto',
                border: 'none', // Remove the border
                borderRadius: '15px',
                backgroundColor: 'white', // Set background color to transparent
                padding: 0, // Remove any padding
                overflow: 'visible', // Allow content to overflow
              },
            }}>
              <Auth onClose={handleLoginModalClose} onLoginSuccess={handleLoginSuccess} />
            </Modal>

            <Modal isOpen={isSignUpModalOpen} onRequestClose={handleSignUpModalClose} contentLabel='Kayıt Ol Modalı' style={{
              overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)', // Set background color to transparent
                zIndex: 1000,
              },
              content: {
                width: 'auto', // Let the width be determined by content
                maxWidth: '30%',
                height: 'auto', // Let the height be determined by content
                maxHeight:'80vh',
                margin: '0 auto',
                border: 'none', // Remove the border
                borderRadius: '15px',
                backgroundColor: 'white', // Set background color to transparent
                padding: 0, // Remove any padding
                overflow: 'visible', // Allow content to overflow
              },
            }}    >
              <SignUp onClose={handleSignUpModalClose} />
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