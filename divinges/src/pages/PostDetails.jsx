import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import CommentForm from '../components/CommentForm';
import CommentsList from '../components/CommentsList';
import Navbar from '../components/Navigation/Navbar';

const PostDetails = () => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const { postId } = useParams();
  const { user } = useAuth(); // Utilizamos el hook useAuth para acceder al estado de autenticación
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3001/posts/${postId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setPost(data.post);
        setComments(data.comments); // Asumiendo que tu API devuelve los comentarios con los detalles del post
      } catch (error) {
        console.error("Error loading post details:", error);
      }
    };

    fetchPostDetails();
  }, [postId]);

  const handleBackToForum = () => {
    navigate('/foro');
  };

  const isAuthenticated = user && user.isLoggedIn;

  return (
    <div className="post-details-container">
      <Navbar />
      <button onClick={handleBackToForum}>Volver al foro</button>
      {post && (
        <div>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          {/* Aquí podrías incluir más detalles del post como el autor, fecha, etc. */}
        </div>
      )}
      <CommentsList comments={comments} />
      {isAuthenticated ? (
        <CommentForm postId={postId} setComments={setComments} />
      ) : (
        <p>Debes iniciar sesión para poder comentar.</p>
      )}
    </div>
  );
};

export default PostDetails;
