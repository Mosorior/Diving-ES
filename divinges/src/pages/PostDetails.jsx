import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navigation/Navbar';
import NavbarForo from '../components/Navigation/NavbarForo';
import CommentsList from '../components/CommentsList';
import CommentForm from '../components/CommentForm';
import { useAuth } from '../components/AuthContext'; // Asegúrate de que la ruta sea correcta

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

    return (
        <div>
            <Navbar />
            <NavbarForo />
            <div className="post-details">
                {post ? (
                    <>
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                        {/* Aquí puedes incluir más detalles del post */}
                    </>
                ) : (
                    <p>Cargando detalles del post...</p>
                )}
            </div>
            {/* Asegúrate de que user y user.userId existan antes de renderizar CommentForm */}
            {user && user.userId && (
                <CommentForm postId={postId} onCommentPosted={loadComments} />
            )}
            <CommentsList postId={postId} comments={comments} />
        </div>
    );
};

export default PostDetails;
