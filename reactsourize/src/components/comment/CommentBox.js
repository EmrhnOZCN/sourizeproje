import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        toast.error('Yorum boş olamaz.');
        return;
      }

      // Kontrol et: userId var mı?
      if (userId === null || userId === undefined) {
        toast.error('userId eksik.');
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
        toast.success('Yorum başarıyla eklendi.');

      } else {
        toast.error('Yorum eklenirken bir hata oluştu.');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('Yorum eklenirken bir hata oluştu.');
    }
  };

  return (
    <div className="flex items-center  w-11/12">
      <input
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Yorumunuzu buraya yazın..."
        className="mr-2 border p-1 flex-grow rounded-md w-5/12"
      />
      <button className="buttons" onClick={handleAddComment}>
        Yorum Yap
      </button>
      <ToastContainer />
    </div>
  );
}

export default CommentBox;