import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AddComment from '../components/Comments/AddComment';
import Navbar from '../components/Navigation/Navbar';
import DOMPurify from 'dompurify';
import { marked } from 'marked';
import '../style/PostDetails.css';

const PostDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`http://localhost:3001/api/posts/${postId}`);
      if (!response.ok) {
        console.error('Error fetching post:', response.statusText);
        return;
      }
      const postData = await response.json();
      setPost(postData);
    };

    fetchPost();

    fetchComments();
  }, [postId]);

  // Función para obtener los comentarios
  const fetchComments = async () => {
    const response = await fetch(`http://localhost:3001/api/posts/${postId}/comments`);
    if (!response.ok) {
      console.error('Error fetching comments:', response.statusText);
      return;
    }
    const commentsData = await response.json();
    setComments(commentsData);
  };

  if (!post) {
    return <div>Cargando post...</div>;
  }

  // Convert Markdown content to HTML and sanitize it
  const postContentHtml = post.content ? DOMPurify.sanitize(marked(post.content)) : '';

  // Función para formatear la fecha en el formato deseado
  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    return formattedDate;
  };

  return (
    <div>
      <Navbar />
      <div className='post-details-container'>
        <h1 className="post-title">{post.title}</h1>
        <div className="post-metadata">
          <p>Autor: <span className="post-author">{post.author.username}</span></p>
          <p>Fecha: <span className="post-date">{formatDateTime(post.date)}</span></p>
        </div>
        <div className="post-content" dangerouslySetInnerHTML={{ __html: postContentHtml }}></div>

        <h2 className="comments-section">Comentarios</h2>
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            <div className="comment-content">Comentario: {comment.content}</div>
            <div className="comment-author">Autor: {comment.userName || 'Anónimo'}</div>
            <div className="comment-date">Fecha: {formatDateTime(comment.date)}</div>
          </div>
        ))}

        <AddComment postId={postId} onCommentAdded={fetchComments} />
      </div>
    </div>
  );
};

export default PostDetails;
