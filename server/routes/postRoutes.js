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
router.get('/', (req, res) => {
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
    const imagesPath = imagenes.join(';'); 

    // <!-- NEW -->
    const insertPostQuery = 'INSERT INTO foroposts (title, content, author, date, images, tags) VALUES (?, ?, ?, ?, ?, ?)';

    db.run(insertPostQuery, [titulo, cuerpo, author, date, imagesPath, tags], function(err) {
        if (err) {
            console.error('Error al insertar el post en la base de datos:', err);
            return res.status(500).send('Error al crear el post');
        }
        res.status(200).json({ mensaje: 'Post creado exitosamente', id: this.lastID });
    });
});

// Endpoint para obtener los detalles de un post específico por su ID
router.get('/:postId', (req, res) => {
    const { postId } = req.params;
  
    const selectPostQuery = 'SELECT * FROM foroposts WHERE id = ?';

    const selectAuthorQuery = 'SELECT * FROM users WHERE username = ?';
  
    db.get(selectPostQuery, [postId], (err, row) => {
      if (err) {
        console.error('Error al obtener el post:', err);
        return res.status(500).send('Error al obtener el post');
      }
      if (row) {
        const tags = row.tags ? row.tags.split(',').map(tag => tag.trim()) : [];
  
        db.get(selectAuthorQuery, [row.author], (err, authorRow) => {
          if (err) {
            console.error('Error al obtener el autor:', err);
            return res.status(500).send('Error al obtener el autor');
          }
          const postDetails = { ...row, author: authorRow, tags };
          res.status(200).json(postDetails);
        });
      } else {
        res.status(404).send('Post no encontrado');
      }
    });
  });

// Endpoint para crear un nuevo comentario en un post.
router.post('/:postId/comments', async (req, res) => {
    const { postId } = req.params;
    const { content, userId } = req.body; // `userId` puede ser null para comentarios anónimos o contener el ID del usuario

    const insertCommentQuery = `
        INSERT INTO comments (content, postId, userId, date)
        VALUES (?, ?, ?, CURRENT_TIMESTAMP)
    `;

    db.run(insertCommentQuery, [content, postId, userId], function(err) {
        if (err) {
            console.error('Error al insertar el comentario en la base de datos:', err);
            return res.status(500).send('Error al crear el comentario');
        }
        res.status(200).json({ mensaje: 'Comentario creado exitosamente', id: this.lastID });
    });
});

// Endpoint para obtener los comentarios de un post específico.
router.get('/:postId/comments', (req, res) => {
    const { postId } = req.params;

    const selectCommentsQuery = `
        SELECT comments.*, users.username AS userName
        FROM comments
        LEFT JOIN users ON comments.userId = users.id
        WHERE comments.postId = ?
        ORDER BY comments.date DESC
    `;

    db.all(selectCommentsQuery, [postId], (err, comments) => {
        if (err) {
            console.error('Error al obtener los comentarios:', err);
            return res.status(500).send('Error al obtener los comentarios');
        }
        res.status(200).json(comments);
    });
});


module.exports = router;