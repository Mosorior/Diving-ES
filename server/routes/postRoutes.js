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
    const { tag } = req.query; // Obtiene el parámetro 'tag' de la consulta, si existe
    let selectPostsQuery = 'SELECT * FROM foroposts';
    const params = [];

    if (tag) {
        // Añade el filtrado por tag. Utiliza parámetros para evitar inyección SQL
        selectPostsQuery += " WHERE tags LIKE ?";
        params.push(`%${tag}%`); // Asume que tus tags están en un formato que permite el uso de LIKE
    }

    selectPostsQuery += ' ORDER BY date DESC';

    db.all(selectPostsQuery, params, (err, rows) => {
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

// Endpoint para obtener los detalles de un post específico por su ID
router.get('/posts/:postId', (req, res) => {
    const { postId } = req.params;

    const selectPostQuery = 'SELECT * FROM foroposts WHERE id = ?';

    db.get(selectPostQuery, [postId], (err, row) => {
        if (err) {
            console.error('Error al obtener el post:', err);
            return res.status(500).send('Error al obtener el post');
        }
        if (row) {
            res.status(200).json(row);
        } else {
            res.status(404).send('Post no encontrado');
        }
    });
});

// Endpoint para crear un nuevo comentario en un post.
router.post('/posts/:postId/comments', (req, res) => {
    const { postId } = req.params;
    const { userId, content, date } = req.body;

    const insertCommentQuery = 'INSERT INTO comments (content, postId, userId, date) VALUES (?, ?, ?, CURRENT_TIMESTAMP)';

    db.run(insertCommentQuery, [content, postId, userId, date], function(err) {
        if (err) {
            console.error('Error al insertar el comentario en la base de datos:', err);
            return res.status(500).send('Error al crear el comentario');
        }
        res.status(200).json({ mensaje: 'Comentario creado exitosamente', id: this.lastID });
    });
});

// Endpoint para obtener los comentarios de un post específico.
router.get('/posts/:postId/comments', (req, res) => {
    const { postId } = req.params;

    const selectCommentsQuery = `
        SELECT comments.id, comments.content, comments.date, users.username AS userName
        FROM comments
        JOIN users ON comments.userId = users.id
        WHERE comments.postId = ?
        ORDER BY comments.date DESC
    `;

    db.all(selectCommentsQuery, [postId], (err, rows) => {
        if (err) {
            console.error('Error al obtener los comentarios:', err);
            return res.status(500).send('Error al obtener los comentarios');
        }
        res.status(200).json(rows);
    });
});

module.exports = router;
