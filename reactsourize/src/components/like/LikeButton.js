import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LikeButton({ postId, initialLikeCount, initialIsLiked }) {
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [isLiked, setIsLiked] = useState(initialIsLiked);

  useEffect(() => {
    // Fetch initial like status when component mounts
    const fetchLikeStatus = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/likes/check`, {
          params: {
            postId: postId,
            userId: 1,
          },
        });
        setIsLiked(response.data.isLiked);
      } catch (error) {
        console.error('Like status fetch error:', error);
      }
    };

    fetchLikeStatus();
  }, [postId]);

  const handleLikeClick = async () => {
    try {
      if (isLiked) {
        await axios.delete(`http://localhost:8080/api/likes/unlike`, {
          params: {
            postId: postId,
            userId: 1,
          },
        });
        setLikeCount((prevLikeCount) => prevLikeCount - 1);
      } else {
        await axios.post(`http://localhost:8080/api/likes/like`, null, {
          params: {
            postId: postId,
            userId: 1,
          },
        });
        setLikeCount((prevLikeCount) => prevLikeCount + 1);
      }

      setIsLiked((prevIsLiked) => !prevIsLiked);
    } catch (error) {
      console.error('Like operation error:', error);
    }
  };

  return (
    <button className={`mr-2 text-blue-500 ${isLiked ? 'text-red-500' : ''}`} onClick={handleLikeClick}>
      {isLiked ? '❤️' : '🤍'} Like
    </button>
  );
}

export default LikeButton;
