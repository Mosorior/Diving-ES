const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('../config/db'); // Asegúrate de que la ruta a db.js sea correcta.

const router = express.Router();

// Configuración de multer para subir imágenes.
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '..', 'uploads', 'posts');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        // Genera un nombre de archivo único para evitar sobreescrituras.
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

// Endpoint para crear un nuevo post.
router.post('/crearpost', upload.array('imagenes'), (req, res) => {
    const { titulo, cuerpo } = req.body;
    const imagenes = req.files.map(file => `/uploads/posts/${file.filename}`); // Genera las rutas de acceso para las imágenes subidas.

    // Inserta el post en la base de datos. Asume que tienes una columna para imágenes o una tabla relacionada.
    const insertPostQuery = 'INSERT INTO foroposts (title, content, images) VALUES (?, ?, ?)';
    // Convierte el array de rutas de imágenes en una cadena si tu base de datos no soporta directamente arrays.
    const imagesPath = imagenes.join(';'); 

    db.run(insertPostQuery, [titulo, cuerpo, imagesPath], function(err) {
        if (err) {
            console.error('Error al insertar el post en la base de datos:', err);
            return res.status(500).send('Error al crear el post');
        }
        res.status(200).json({ mensaje: 'Post creado exitosamente', id: this.lastID });
    });
});

module.exports = router;
