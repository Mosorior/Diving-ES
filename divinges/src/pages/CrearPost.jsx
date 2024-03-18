import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SimpleMDE from 'easymde';
import 'easymde/dist/easymde.min.css';
import { marked } from 'marked';
import Navbar from '../components/Navigation/Navbar';
import { useAuth } from '../components/AuthContext'; // Asegúrate de que la ruta sea correcta
import '../style/CrearPost.css';

function CrearPost() {
    const [titulo, setTitulo] = useState('');
    const [tags, setTags] = useState('general');
    const simpleMdeRef = useRef(null);
    //const [imagenes, setImagenes] = useState([]);
    const mdeRef = useRef(null);
    const navigate = useNavigate();
    const { user } = useAuth(); // Usar useAuth para acceder al usuario actual y al token

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    useEffect(() => {
        if (mdeRef.current) {
            simpleMdeRef.current = new SimpleMDE({
                element: mdeRef.current,
                previewRender(plainText) {
                    return marked.parse(plainText);
                },
            });
        }

        return () => {
            if (simpleMdeRef.current) {
                simpleMdeRef.current.toTextArea();
                simpleMdeRef.current = null;
            }
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const fechaActual = new Date().toISOString(); // Formato ISO para la fecha
        const cuerpo = simpleMdeRef.current.value(); // Asegúrate de obtener correctamente el valor del editor Markdown
    
        const postData = {
            titulo,
            cuerpo,
            author: user.username,
            tags,
            date: fechaActual,
        };
    
        try {
            const res = await fetch('http://localhost:3001/api/posts/crearpost', {
                method: 'POST',
                body: JSON.stringify(postData),
                headers: {
                    'Content-Type': 'application/json', // Indica que el cuerpo de la solicitud es un JSON
                    'Authorization': `Bearer ${user.token}`,
                },
            });
    
            if (!res.ok) {
                throw new Error('Error al crear el post');
            }
    
            navigate('/foro'); // Redirigir al foro después de crear el post
        } catch (error) {
            console.error("Error al crear el post: ", error);
        }
    };
    
    return (
        <div>
            <Navbar />
            <h2>Crear Post</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Título:</label>
                    <input
                        type="text"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                    />
                </div>
                <div>
                    <label>Cuerpo (Markdown):</label>
                    <textarea id="mde" ref={mdeRef}></textarea>
                </div>
                <div>
                     <label>Tags:</label>
                    <select className="tag-select" name="tags" value={tags} onChange={(e) => setTags(e.target.value)}>
                        <option value="general">General</option>
                        <option value="conservacion">Conservación</option>
                        <option value="sitios">Sitios</option>
                        <option value="equipo">Equipo</option>
                    </select>
                </div>
                <button type="submit" className='btn-form'>Crear Post</button>
            </form>
        </div>
    );
}

export default CrearPost;
