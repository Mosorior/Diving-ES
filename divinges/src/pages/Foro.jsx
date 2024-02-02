import React, { useState, useEffect } from 'react';
import NavbarForo from '../components/Navigation/NavbarForo';
import Navbar from '../components/Navigation/Navbar'; // Asegúrate de que la ruta sea correcta

const Foro = () => {
    const [posts, setPosts] = useState([]); // Estado para almacenar los posts del foro

    useEffect(() => {
        // Aquí deberías cargar los posts del foro desde tu backend
        const cargarPosts = async () => {
            try {
                // Simula la carga de datos con datos de ejemplo
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
    }, []); // El array vacío asegura que este efecto se ejecute solo una vez al montar el componente

    return (
        <div>
            <Navbar />
            <div className="foro-container">
                <h2>Foro de Buceo</h2>
                <NavbarForo />
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
        </div>
    );
};

export default Foro;
