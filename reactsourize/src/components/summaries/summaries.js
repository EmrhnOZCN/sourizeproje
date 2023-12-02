import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';

 const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;

  `;


function Summaries({ postId }) {
  const [postSummary, setPostSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostSummary = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/getPosts/${postId-1}`);
        setPostSummary(response.data);
      } catch (error) {
        console.error('Error fetching post summary:', error);
      } finally {
        setLoading(false); // İsteğin sonunda yükleme durumunu güncelle
      }
    };

    // Sadece postId değiştiğinde fetch işlemini gerçekleştir
    if (postId) {
      setLoading(true); // İstek başladığında yükleme durumunu güncelle
      fetchPostSummary();
    }
  }, [postId]);

  return (
    <div className="border rounded-md p-4 bg-white shadow-md">
      {loading ? (
        <div className="mb-4" style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ClipLoader color="red" loading={loading} css={override} size={100} />
                </div>
      ) : (
        <>
          <h2 className="text-xl font-bold mb-2">Seçilen Post</h2>
          <p>{postSummary?.textParagraph}</p>
          {/* Diğer post özelliklerini buraya ekleyebilirsiniz */}
        </>
      )}
    </div>
  );
}

export default Summaries;
