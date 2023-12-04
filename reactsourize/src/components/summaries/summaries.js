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

function Summaries({ postId,userId }) {
  const [postSummary, setPostSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loadedComments, setLoadedComments] = useState([]);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {

    console.log('User ID in Summaries:', userId);
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
            userId: 1,
          },
        });
        setIsLiked(likeStatusResponse.data.isLiked);
      } catch (error) {
        console.error('Post detayları çekme hatası:', error);
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
      fetchComments();
    }
  }, [postId]);

  const handleSummarizeClick = async () => {
    // Özetleme işlemleri burada yapılacak
    // Örneğin: const summarizedText = await summarizeFunction(postSummary?.textParagraph);
    // setSummarizedText(summarizedText);
  };

  return (
    <div className="border rounded-md p-4 bg-white shadow-md" style={{ position: 'relative' }}>
      {loading ? (
        <div className="mb-4" style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ClipLoader color="red" loading={loading} css={override} size={100} />
        </div>
      ) : (
        <>
          <h2 className="text-xl font-bold mb-2" style={{ marginRight: '50px' }}>
            Seçilen Post
          </h2>
          <button
            style={{ position: 'absolute', top: 10, right: 15 }}
            className="bg-green-500 text-white px-3 py-1 rounded-md"
            onClick={handleSummarizeClick}
          >
            Özetle
          </button>
          <p>{postSummary?.textParagraph}</p>
          <div className="flex justify-between mt-4">
            <div>
              <LikeButton postId={postId} initialLikeCount={likeCount} initialIsLiked={isLiked} />
            </div>
            <div className="flex items-center">
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
                      <strong>{comment?.userId}</strong>: {comment?.content}
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
