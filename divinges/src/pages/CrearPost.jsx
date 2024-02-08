import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SimpleMDE from 'easymde';
import 'easymde/dist/easymde.min.css';
import { marked } from 'marked';
import Navbar from '../components/Navigation/Navbar';
import { useAuth } from '../components/AuthContext'; // Asegúrate de que la ruta sea correcta

function CrearPost() {
    const [titulo, setTitulo] = useState('');
    const simpleMdeRef = useRef(null);
    const [imagenes, setImagenes] = useState([]);
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
                initialValue: 'Escribe aquí...',
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
        const formData = new FormData();
        formData.append('titulo', titulo);
        formData.append('cuerpo', simpleMdeRef.current.value());
        formData.append('author', user.username); // Asume que el username está disponible en el estado del usuario
        formData.append('date', fechaActual); // Añade la fecha actual
        imagenes.forEach(imagen => {
            formData.append('imagenes', imagen);
        });

        try {
            const res = await fetch('http://localhost:3001/crearpost', {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${user.token}`, // Asegúrate de que tu backend espera un header de autorización
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

    const handleImageChange = (e) => {
        setImagenes([...e.target.files]);
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
                    <label>Subir Imágenes:</label>
                    <input
                        type="file"
                        multiple
                        onChange={handleImageChange}
                    />
                </div>
                <button type="submit">Crear Post</button>
            </form>
        </div>
    );
}

export default CrearPost;
