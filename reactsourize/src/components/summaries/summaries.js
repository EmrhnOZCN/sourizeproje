import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';
import LikeButton from '../like/LikeButton';
import CommentBox from '../comment/CommentBox';
import Summary from './summary';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function Summaries({ postId }) {
  const [postSummary, setPostSummary] = useState(null);
  const [summaryPost, setSummaryPost] = useState();
  const [loading, setLoading] = useState(true);
  const [likeCount, setLikeCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loadedComments, setLoadedComments] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const userId = localStorage.getItem('userId');
  const [SummarizedTitle, setSummarizedTitle] = useState('');
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    const fetchPostSummary = async () => {
      try {
          const postId = localStorage.getItem('postId');
        const response = await axios.get(`http://localhost:8080/api/getPosts/${postId}`);
        setPostSummary(response.data);
        setShowSummary(false);
      } catch (error) {
        console.error('Error fetching post summary:', error);
      } finally {
        setLoading(false);
      }
   };


    const fetchPostDetails = async () => {
      try {
        const detailsResponse = await axios.get(`http://localhost:8080/api/getPosts/${postId}`);
        setLikeCount(detailsResponse.data.likeCount);

        const likeStatusResponse = await axios.get(`http://localhost:8080/api/likes/like`, {
          params: {
            postId: postId,
            userId: userId,
          },
        });

        setIsLiked(likeStatusResponse.data.isLiked);
      } catch (error) {
        console.error('Post detayları çekme hatası:', error);
      }
    };

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/public/getUser/${userId}`);
        setLastName(response.data.lastName);
        setFirstName(response.data.firstName);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchComments = async () => {
      try {

        const postId = localStorage.getItem('postId');
        const commentsResponse = await axios.get(`http://localhost:8080/api/comments/post/${postId}`);

        setComments(commentsResponse.data.comments);
        setLoadedComments(commentsResponse.data.comments);
      } catch (error) {
        console.error('Yorumları çekme hatası:', error);
      }
    };

    if (postId) {
      setLoading(true);
      fetchPostSummary();
      fetchPostDetails();
      fetchUserData();
      fetchComments();
    }
  }, [postId, userId]);

  const handleSummarizeClick = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/public/summary/${postId}`);

      // Veriyi doğru bir şekilde alıp set et
      const summaryData = response.data[0];
      setSummaryPost(summaryData.summary_text);


      setShowSummary(true);
    } catch (error) {
      console.error('Error fetching post summary:', error);
    }
  };


    useEffect(() => {
      console.log('Summary Post:', summaryPost);
      console.log('Summarized Title:', SummarizedTitle);
    }, [summaryPost, SummarizedTitle]);


  const handleGoBackClick = () => {
    setShowSummary(false);
  };

  return (
    <div className="border rounded-md p-4 bg-white shadow-md" style={{ position: 'relative' }}>
      {loading ? (
        <div className="mb-4" style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ClipLoader color="red" loading={loading} css={override} size={100} />
        </div>
      ) : (
        <>
          <div className='w-1/6'>
            <LikeButton
              postId={postId}
              initialIsLiked={isLiked}
              onLikeCountChange={(newLikeCount) => setLikeCount(newLikeCount)}
            />
          </div>
          <h2 className="text-xl font-bold mb-2 text-center font-normal" >
            Seçilen Post
          </h2>
          {showSummary ? (
            <>
             <Summary/>
              {/* "Habere Geri Dön" butonu */}
              <button
                style={{ position: 'absolute', top: 10, right: 15 }}
                className="buttons"
                onClick={handleGoBackClick}
              >
                Habere Geri Dön
              </button>
              {/* Sadece başlık olarak özet */}
              <h3 className="text-lg font-bold mb-2">{SummarizedTitle}</h3>
            </>
          ) : (
            <>
              {/* "Özetle" butonu */}


              <button
                style={{ position: 'absolute', top: 10, right: 15 }}
                className="buttons"
                onClick={handleSummarizeClick}
              >
                Özetle

              </button>
              {/* Normal postu göster */}
              <p>{postSummary?.textParagraph}</p>


            </>
          )}
          <div className="flex justify-around mt-4">
            <div className="flex items-center w-5/6">
              <CommentBox postId={postId} userId={userId} onCommentAdd={(newComment) => setLoadedComments([...loadedComments, newComment])} />
            </div>
          </div>
          <div className="mt-2">
            {loadedComments.length > 0 && (
              <>
                <div className='text-center pt-5'>
                  <h3 className="text-xl font-bold mb-2 text-center font-normal">Yorumlar</h3>
                </div>
                <ul>
                  <div className=' rounded-md '>
                    {loadedComments.slice(0).reverse().map((comment) => (
                      <li key={comment?.id} className='pt-4 '>
                        <div className='rounded-md bg-gray-50 pt-4 shadow-md'>
                          <p className=' text-lg font-bold mb-2 font-normal'>&nbsp;{comment?.firstName}&nbsp;
                          {comment?.lastName}</p>
                          <p className='ml-2 text-gray-500  font-sans text-sm pb-2'>
                          {comment?.content}
                          </p>
                        </div>
                      </li>
                    ))}
                  </div>
                </ul>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Summaries;