import React, { useEffect, useState } from 'react';

const CommentsList = ({ postId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const loadComments = async () => {
      try {
        const response = await fetch(`http://localhost:3001/posts/${postId}/comments`);
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
    <div>
      {comments.map((comment) => (
        <div key={comment.id} style={{ marginBottom: '20px' }}>
          <p><strong>{comment.userName}</strong></p> {/* Asume que `userName` es el campo retornado por tu API */}
          <p>{comment.content}</p>
          <p style={{ fontStyle: 'italic' }}>{formatDate(comment.date)}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentsList;
