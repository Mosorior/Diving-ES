import React, { useState } from 'react';
import axios from 'axios';

const ProfileImageUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('profileImage', selectedFile);

        try {
            const response = await axios.post('http://localhost:5000/api/user/profile/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
            // Manejo de respuesta exitosa
        } catch (error) {
            console.error(error);
            // Manejo de errores
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileSelect} />
            <button onClick={handleUpload}>Subir Imagen</button>
        </div>
    );
};

export default ProfileImageUpload;
