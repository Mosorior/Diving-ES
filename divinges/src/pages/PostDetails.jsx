import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AddComment from '../components/Comments/AddComment';
import Navbar from '../components/Navigation/Navbar';

const PostDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      // Aquí se utiliza `await` dentro de una función `async` correctamente.
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

  return (
    <div>
      <Navbar />
      <h1>{post.title}</h1>
      <p>Autor: {post.author.username}</p>
      <p>Fecha: {post.date}</p>
      <img src={post.imageUrl} alt={post.title} />
      <p>{post.content}</p>

      <h2>Comentarios</h2>
      {comments.map((comment) => (
  <div key={comment.id}>
    <p>Comentario: {comment.content}</p>
    <p>Autor: {comment.userName || 'Anónimo'}</p>
    <p>Fecha: {comment.date}</p>
  </div>
))}

      <AddComment postId={postId} />
    </div>
  );
};

export default PostDetails;