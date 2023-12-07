import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';
import LikeButton from '../like/LikeButton';
import CommentBox from '../comment/CommentBox';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function Summaries({ postId }) {
  const [postSummary, setPostSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likeCount, setLikeCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loadedComments, setLoadedComments] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [firstName, setFirstName] = useState(''); // Değerleri string olarak değiştir
  const [lastName, setLastName] = useState(''); // Değerleri string olarak değiştir
  const userId = localStorage.getItem('userId');
  const [SummarizedText, setSummarizedText] = useState(''); // Değerleri string olarak değiştir

  useEffect(() => {
    const fetchPostSummary = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/getPosts/${postId}`);
        setPostSummary(response.data);
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
        console.log(userId)
        console.log(response.data.firstName); // Move the console.log here
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };


    const fetchComments = async () => {
      try {
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
      fetchUserData(); // fetchUserData fonksiyonunu çağır
      fetchComments();
    }
  }, [postId, userId]);

  const handleSummarizeClick = async () => {
    // const summarizedText = await summarizeFunction(postSummary?.textParagraph);
    setSummarizedText('sex'); // Set the desired value for SummarizedText
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
          <button
            style={{ position: 'absolute', top: 10, right: 15 }}
            className="buttons"
            onClick={handleSummarizeClick}
          >
            Özetle
          </button >
          <p>{postSummary?.textParagraph}</p>
          <div className="flex justify-around mt-4">
            <div className="flex items-center w-5/6 ">
              <CommentBox postId={postId} userId={userId} onCommentAdd={(newComment) => setLoadedComments([...loadedComments, newComment])} />
            </div>
          </div>
          <div className="mt-2">
           {loadedComments.length > 0 && (
             <>
               <h3 className="text-lg font-bold mb-2">Yorumlar</h3>
               <ul>
                 {loadedComments.slice(0).reverse().map((comment) => (
                   <li key={comment?.id} className="mb-2">
                     <strong>{comment?.firstName} {comment?.lastName}</strong>: {comment?.content}
                   </li>
                 ))}
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
