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

function Summary({  }) {
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
  const postId = localStorage.getItem('postId');
  const [SummarizedTitle, setSummarizedTitle] = useState('');
  const [showSummary, setShowSummary] = useState(false);

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/public/getUser/${userId}`);
        setLastName(response.data.lastName);
        setFirstName(response.data.firstName);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

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
    handleSummarizeClick(); // Fonksiyonu tetikle
    console.log(summaryPost);
  }, [showSummary]);


  const handleGoBackClick = () => {
    setShowSummary(false);
  };

  return (
    <div className="border rounded-md p-4 bg-white shadow-md" style={{ position: 'relative' }}>
        <p>{summaryPost}</p>
    </div>
  );
}
export default Summary;