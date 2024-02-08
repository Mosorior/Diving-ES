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

// Endpoint para obtener todos los posts
router.get('/posts', (req, res) => {
    const selectPostsQuery = 'SELECT * FROM foroposts ORDER BY date DESC'; // Ajusta según tus necesidades

    db.all(selectPostsQuery, [], (err, rows) => {
        if (err) {
            console.error('Error al obtener los posts:', err);
            return res.status(500).send('Error al obtener los posts');
        }
        res.status(200).json(rows);
    });
});

// Endpoint para crear un nuevo post.
router.post('/crearpost', upload.array('imagenes'), (req, res) => {
    const { titulo, cuerpo, author, date, tags } = req.body; // Asegúrate de incluir 'tags' aquí
    const imagenes = req.files.map(file => `/uploads/posts/${file.filename}`);
    const insertPostQuery = 'INSERT INTO foroposts (title, content, author, date, images, tags) VALUES (?, ?, ?, ?, ?, ?)'; // Asegúrate de que la consulta SQL incluya 'tags'
    const imagesPath = imagenes.join(';'); 

    db.run(insertPostQuery, [titulo, cuerpo, author, date, imagesPath, tags], function(err) {
        if (err) {
            console.error('Error al insertar el post en la base de datos:', err);
            return res.status(500).send('Error al crear el post');
        }
        res.status(200).json({ mensaje: 'Post creado exitosamente', id: this.lastID });
    });
});

module.exports = router;
