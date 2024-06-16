import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from './AuthContext'; // Asegúrate de que la ruta sea correcta

const CommentForm = ({ postId, onCommentPosted }) => {
  const [content, setContent] = useState('');
  const { user } = useAuth(); // Utiliza useAuth para acceder al usuario autenticado
  const textareaRef = useRef(null);

  useEffect(() => {
    // Solo ajusta el estilo si textareaRef.current está disponible
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Resetea la altura para obtener la altura correcta
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Ajusta a la altura del contenido
    }
  }, [content]); // Dependencia: contenido del textarea

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Verifica si hay un usuario autenticado antes de enviar el comentario
    if (!user || !user.userId) {
      console.error("Usuario no autenticado o userId no disponible");
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Opcionalmente, puedes incluir el token en los headers si tu backend requiere autenticación
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ content, userId: user.userId }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      if (result) {
        // Llama a esta función para actualizar la lista de comentarios en el componente padre
        if (onCommentPosted) onCommentPosted(); // Asegúrate de que esta función esté definida
        setContent('');
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        ref={textareaRef}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      ></textarea>
      <button type="submit">Enviar Comentario</button>
    </form>
  );
};

export default CommentForm;
