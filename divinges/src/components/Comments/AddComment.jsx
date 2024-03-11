import React, { useState } from 'react';
import { useAuth } from '../AuthContext'; // Ajusta la ruta según donde tengas tu AuthContext
import { addComment } from '../services/commentsService';

const AddComment = ({ postId }) => {
  const { user } = useAuth(); // Obtiene el usuario actual del contexto
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Construye el objeto de comentario
    const comment = {
      content,
      // Si hay un usuario logueado, usa su ID. Si no, el campo userId será null (usuario anónimo)
      userId: user ? user.id : null
    };

    try {
      await addComment(postId, comment);
      setContent('');
    } catch (error) {
      console.error("Error al añadir el comentario:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="content">Contenido:</label>
      <input
        type="text"
        id="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">Agregar comentario</button>
    </form>
  );
};

export default AddComment;
