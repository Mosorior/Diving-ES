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

    const fetchComments = async () => {
      const response = await fetch(`http://localhost:3001/api/posts/${postId}/comments`);
      if (!response.ok) {
        console.error('Error fetching comments:', response.statusText);
        return;
      }
      const commentsData = await response.json();
      setComments(commentsData);
    };

    fetchComments();
  }, [postId]);

  if (!post) {
    return <div>Cargando post...</div>;
  }

  // Convert Markdown content to HTML and sanitize it
  const postContentHtml = post.content ? DOMPurify.sanitize(marked(post.content)) : '';

  return (
    <div>
      <Navbar />
      <div className='post-details-container'>
        <h1 className="post-title">{post.title}</h1>
        <div className="post-metadata">
          <p>Autor: <span className="post-author">{post.author.username}</span></p>
          <p>Fecha: <span className="post-date">{post.date}</span></p>
        </div>
        <img src={post.imageUrl} alt={post.title} className="post-image" />
        <div className="post-content" dangerouslySetInnerHTML={{ __html: postContentHtml }}></div>

        <h2 className="comments-section">Comentarios</h2>
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            <div className="comment-content">Comentario: {comment.content}</div>
            <div className="comment-author">Autor: {comment.userName || 'Anónimo'}</div>
            <div className="comment-date">Fecha: {comment.date}</div>
          </div>
        ))}

        <AddComment postId={postId} />
      </div>
    </div>
  );
};

export default PostDetails;
