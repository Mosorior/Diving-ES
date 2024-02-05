import React, { useState, useEffect } from 'react';
import NavbarForo from '../components/Navigation/NavbarForo';
import Navbar from '../components/Navigation/Navbar';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import '../style/Foro.css';
import '../style/ModalBase.css';

const Foro = () => {
    const [posts, setPosts] = useState([]);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);

    useEffect(() => {
        const cargarPosts = async () => {
            try {
                const postsEjemplo = [
                    { id: 1, titulo: 'Mejores lugares para bucear en el Caribe', contenido: '¿Alguien tiene recomendaciones de buenos lugares para bucear en el Caribe?', autor: 'Usuario1', fecha: '2023-02-10' },
                    { id: 2, titulo: 'Consejos para principiantes', contenido: '¿Qué consejos tienen para alguien que está empezando a bucear?', autor: 'Usuario2', fecha: '2023-02-12' }
                ];
                setPosts(postsEjemplo);
            } catch (error) {
                console.error("Error al cargar posts: ", error);
            }
        };

        cargarPosts();
    }, []);

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
                            <h3>{post.titulo}</h3>
                            <p>{post.contenido}</p>
                            <p>Por: {post.autor} en {post.fecha}</p>
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
