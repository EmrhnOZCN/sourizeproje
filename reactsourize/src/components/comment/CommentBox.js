import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CommentBox({ postId, onCommentAdd }) {
  const [newComment, setNewComment] = useState('');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(Number(storedUserId));
    }
  }, []);

  const handleAddComment = async () => {
    try {
      if (!newComment.trim()) {
        console.error('Yorum boş olamaz.');
        return;
      }

      // Kontrol et: userId var mı?
      if (userId === null || userId === undefined) {
        console.error('userId eksik.');
        return;
      }

      const response = await axios.post(`http://localhost:8080/api/comments/add`, {
        postId: postId,
        userId: userId,
        content: newComment,
      });

      if (response.status === 201) {
        onCommentAdd(response.data.newComment);
        setNewComment('');
      } else {
        console.error('Yorum eklenirken bir hata oluştu.');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className="flex items-center">
      <input
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Yorumunuzu buraya yazın..."
        className="mr-2 border p-1 flex-grow"
      />
      <button className="text-green-500 px-4 py-2 rounded-md" onClick={handleAddComment}>
        Yorum Yap
      </button>
    </div>
  );
}

export default CommentBox;
