import React, { useState } from 'react';
import { useAuth } from '../AuthContext'; // Ajusta la ruta según donde tengas tu AuthContext
import { addComment } from '../services/commentsService';

const AddComment = ({ postId, onCommentAdded }) => {
  const { user } = useAuth(); // Obtiene el usuario actual del contexto
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que el contenido no esté vacío
    if (!content.trim()) {
      setError("El comentario no puede estar vacío.");
      return;
    }

    // Construye el objeto de comentario
    const comment = {
      content,
      // Si hay un usuario logueado, usa su ID. Si no, el campo userId será null (usuario anónimo)
      userId: user ? user.userId : null
    };

    try {
      await addComment(postId, comment);
      setContent('');
      setError(null);
      if (onCommentAdded) {
        onCommentAdded();
      }
    } catch (error) {
      console.error("Error al añadir el comentario:", error);
      setError("Error al añadir el comentario.");
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
      {error && <p>Error: {error}</p>}
    </form>
  );
};

export default AddComment;
