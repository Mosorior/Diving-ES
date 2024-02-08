import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import SimpleMDE from 'easymde';
import 'easymde/dist/easymde.min.css';
import { marked } from 'marked';
import Navbar from '../components/Navigation/Navbar';

function CrearPost() {
    const [titulo, setTitulo] = useState('');
    const simpleMdeRef = useRef(null);
    const [imagenes, setImagenes] = useState([]);
    const mdeRef = useRef(null); // Referencia para el elemento DOM del <textarea>


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

        // Limpieza al desmontar
        return () => {
            if (simpleMdeRef.current) {
                simpleMdeRef.current.toTextArea();
                simpleMdeRef.current = null;
            }
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('titulo', titulo);
        formData.append('cuerpo', simpleMdeRef.current.value());
        imagenes.forEach(imagen => {
            formData.append('imagenes', imagen);
        });

        try {
            const res = await fetch('http://localhost:3001/crearpost', {
                method: 'POST',
                body: formData, // FormData será correctamente interpretado por el servidor
            });
            
            console.log(res.data);
            // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
        } catch (error) {
            console.error("Error al crear el post: ", error);
            // Manejar el error
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
