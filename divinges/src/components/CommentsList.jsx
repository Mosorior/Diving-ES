import React, { useEffect, useState } from 'react';
import '../style/PostDetails.css'; // Asegúrate de que la ruta al archivo CSS sea correcta

const CommentsList = ({ postId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const loadComments = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/${postId}/comments`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const fetchedComments = await response.json();
        setComments(fetchedComments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    loadComments();
  }, [postId]);

  // Formatea la fecha y hora del comentario
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(); // Esto dará una representación local de la fecha y hora
  };

  return (
    <div className="comments-list">
      {comments.map((comment) => (
        <div className="comment" key={comment.id}>
          <div className="comment-info">
            <p><strong>{comment.userName}</strong></p> {/* Usuario que publicó el comentario */}
            <p className="comment-content">{comment.content}</p> {/* Contenido del comentario */}
          </div>
          <p className="comment-date">{formatDate(comment.date)}</p> {/* Fecha del comentario */}
        </div>
      ))}
    </div>
  );
};

export default CommentsList;
