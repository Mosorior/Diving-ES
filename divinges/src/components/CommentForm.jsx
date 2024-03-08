import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../components/AuthContext'; // Asegúrate de que la ruta sea correcta

const CommentForm = ({ postId, onCommentPosted }) => {
  const [content, setContent] = useState('');
  const { user } = useAuth(); // Utiliza useAuth para acceder al usuario autenticado
  const textareaRef = useRef(null);
  
  useEffect(() => {
    textareaRef.current.style.height = 'auto'; // Resetea la altura para obtener la altura correcta
    textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'; // Ajusta a la altura del contenido
  }, [content]); // Dependencia: contenido del textarea

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Verifica si hay un usuario autenticado antes de enviar el comentario
    if (!user || !user.userId) {
      console.error("Usuario no autenticado o userId no disponible");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Opcionalmente, puedes incluir el token en los headers si tu backend requiere autenticación
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ 
          content, 
          userId: user.userId // Usa el userId del usuario autenticado
        }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      if (result) {
        onCommentPosted(); // Llama a esta función para actualizar la lista de comentarios en el componente padre
        setContent('');
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      ></textarea>
      <button type="submit">Enviar Comentario</button>
    </form>
  );
};

export default CommentForm;
