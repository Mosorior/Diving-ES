import React, { useState, useEffect } from 'react';
import NavbarForo from '../components/Navigation/NavbarForo';
import Navbar from '../components/Navigation/Navbar';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import { marked } from 'marked'; // Asegúrate de importar marked para procesar el Markdown
import DOMPurify from 'dompurify'; // Importa DOMPurify para sanear el HTML
import '../style/Foro.css';
import '../style/ModalBase.css';

const Foro = () => {
    const [posts, setPosts] = useState([]);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);

    useEffect(() => {
        const cargarPosts = async () => {
            try {
                // Asegúrate de que la URL sea correcta según tu configuración de backend
                const response = await fetch('http://localhost:3001/posts');
                if (!response.ok) {
                    throw new Error('Error HTTP: ${response.status}');
                }
                const posts = await response.json();
                setPosts(posts);
            } catch (error) {
                console.error("Error al cargar posts: ", error);
            }
        };

        cargarPosts();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth() es 0-index, añade 1 para hacerlo 1-index
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
        <div>
            <Navbar />
            <div className="foro-container">
                <h2>Foro</h2>
                <NavbarForo openLoginModal={openLoginModal} openRegisterModal={openRegisterModal} />
                <div className="posts-list">
                    {posts.map(post => (
                        <div key={post.id} className="post">
                            <div className="post-header">
                                <span className="post-tag">{post.tags}</span>
                                <div className="post-title-author">
                                    <h3 className="post-title">{post.title}</h3>
                                    <p className="post-author">{post.author}</p>
                                </div>
                            </div>
                            <div className="post-preview" dangerouslySetInnerHTML={{
                                __html: post.content ? DOMPurify.sanitize(marked.parse(post.content.substring(0, 100))) : ''
                                }}>
                            </div>
                            <p className="post-date">{formatDate(post.date)}</p>
                        </div>
                    ))}
                </div>
            </div>
            {showLoginModal && <LoginForm onClose={closeLoginModal} toggleModal={() => toggleModals('register')} />}
            {showRegisterModal && <RegisterForm onClose={closeRegisterModal} toggleModal={() => toggleModals('login')} />}
        </div>
    );
};

export default Foro;
