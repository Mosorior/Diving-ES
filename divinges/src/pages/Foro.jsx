import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NavbarForo from '../components/Navigation/NavbarForo';
import Navbar from '../components/Navigation/Navbar';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import '../style/Foro.css';
import '../style/ModalBase.css';

const Foro = () => {
    const [posts, setPosts] = useState([]);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const { etiqueta } = useParams(); // Obtiene la etiqueta de la URL
    const navigate= useNavigate();
    
    const irAlForo = () => {
        navigate('/foro')
    };

    const handlePostClick = (postId) => {
        navigate(`/post/${postId}`); // Redirige al usuario a la página de detalles del post
    };

    useEffect(() => {
        const cargarPosts = async () => {
            let url = 'http://localhost:3001/api/posts';
            // Modifica la URL si se especifica una etiqueta en la ruta
            if (etiqueta) {
                url += `?tag=${etiqueta}`; // Modifica según cómo tu backend espera recibir la etiqueta
            }
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
                }
                const fetchedPosts = await response.json();
                setPosts(fetchedPosts);
            } catch (error) {
                console.error("Error al cargar posts: ", error);
            }
        };

        cargarPosts();
    }, [etiqueta]);
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        return `${day}/${month}/${year} ${hours}:${minutes}`;
    };

    const openLoginModal = () => setShowLoginModal(true);
    const closeLoginModal = () => setShowLoginModal(false);
    const openRegisterModal = () => setShowRegisterModal(true);
    const closeRegisterModal = () => setShowRegisterModal(false);

    const toggleModals = (modalName) => {
        if (modalName === 'register') {
            setShowLoginModal(false);
            setShowRegisterModal(true);
        } else if (modalName === 'login') {
            setShowRegisterModal(false);
            setShowLoginModal(true);
        }
    };

    return (
        <div className='container-forum'>
            <Navbar />
            <div className="foro-container">
                <h2 onClick={irAlForo}>Foro</h2>
                <NavbarForo openLoginModal={openLoginModal} openRegisterModal={openRegisterModal} />
                <div className="posts-list">
                    {posts.map(post => (
                        <div key={post.id} className="post" onClick={() => handlePostClick(post.id)}>
                            <div className="post-header">
                                <span className="post-tag">{post.tags}</span>
                                <div className="post-title-author">
                                    <h3 className="post-title">{post.title}</h3>
                                    <p className="post-author">{post.author.username || 'Anónimo'}</p>
                                </div>
                            </div>
                            <div className="post-preview" dangerouslySetInnerHTML={{
                                __html: post.content ? DOMPurify.sanitize(marked.parse(post.content).substring(0, 100)) : ''
                            }}>
                            </div>
                            <p className="post-date">{formatDate(post.date)}</p>
                        </div>
                    ))}
                </div>
            </div>
            {showLoginModal && <LoginForm onClose={closeLoginModal} toggleModal={toggleModals} />}
            {showRegisterModal && <RegisterForm onClose={closeRegisterModal} toggleModal={toggleModals} />}
        </div>
    );
};

export default Foro;
