import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navigation/Navbar';
import NavbarForo from '../components/Navigation/NavbarForo';
import CommentsList from '../components/CommentsList';
import CommentForm from '../components/CommentForm';
import { useAuth } from '../components/AuthContext'; // Asegúrate de que la ruta sea correcta
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import '../style/PostDetails.css'

const PostDetails = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const { user } = useAuth(); // Utiliza useAuth para acceder al usuario autenticado

    const loadComments = async () => {
        try {
            const commentsResponse = await fetch(`http://localhost:3001/posts/${postId}/comments`);
            if (!commentsResponse.ok) {
                throw new Error(`HTTP error! Status: ${commentsResponse.status}`);
            }
            const postComments = await commentsResponse.json();
            setComments(postComments);
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

    useEffect(() => {
        const loadPostDetails = async () => {
            try {
                const postResponse = await fetch(`http://localhost:3001/posts/${postId}`);
                if (!postResponse.ok) {
                    throw new Error(`HTTP error! Status: ${postResponse.status}`);
                }
                const postDetails = await postResponse.json();
                setPost(postDetails);
            } catch (error) {
                console.error("Error fetching post details:", error);
            }
        };

        loadPostDetails();
        loadComments(); // Carga inicial de los comentarios
    }, [postId]);

    // Función para convertir Markdown a HTML seguro
    const createMarkup = (markdown) => {
        const rawMarkup = marked.parse(markdown);
        const sanitizedMarkup = DOMPurify.sanitize(rawMarkup);
        return { __html: sanitizedMarkup };
    };

    return (
        <div>
            <Navbar />
            <NavbarForo />
            <div className="post-details-container"> {/* Usa esta clase para el contenedor principal */}
                {post ? (
                    <div className="post-content"> {/* Clase para el contenido del post */}
                        <h2>{post.title}</h2>
                        <div dangerouslySetInnerHTML={createMarkup(post.content)} />
                    </div>
                ) : (
                    <p>Cargando detalles del post...</p>
                )}
                {user && user.userId && (
                    <div className="comment-form"> {/* Clase para el formulario de comentarios */}
                        <CommentForm postId={postId} onCommentPosted={loadComments} />
                    </div>
                )}
                <div className="comments-list"> {/* Clase para la lista de comentarios */}
                    <CommentsList postId={postId} comments={comments} />
                </div>
            </div>
        </div>
    );
};

export default PostDetails;
