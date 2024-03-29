const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const db = require('../config/db'); // Asegúrate de que la ruta sea correcta para tu estructura de proyecto

const router = express.Router();
const saltRounds = 10;
const JWT_SECRET = 'hYfTmtt9jvfH*tsWRHo8A*ArtD@z#8PKp!qZJK&Y#VTtZP8Y^c';

// Función auxiliar para crear carpetas si no existen
const createFolder = (folder) => {
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true });
    }
};

// Middleware para manejar la subida de imágenes
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const username = req.body.username; // Asegúrate de que el nombre de usuario esté en el cuerpo de la solicitud
        if (!username) {
            return cb(new Error('Nombre de usuario no proporcionado'));
        }
        const folder = path.join(__dirname, '..', 'uploads', username, 'profile-img'); // Ajusta la ruta según tu estructura de proyecto
        createFolder(folder);
        cb(null, folder);
    },
    filename: (req, file, cb) => {
        cb(null, 'profile.jpg'); // Nombre fijo para simplificar, considera añadir lógica para nombres únicos si es necesario
    }
});
const upload = multer({ storage: storage });

// Endpoint para registrar un nuevo usuario
router.post('/register', upload.single('profileImage'), async (req, res) => {
    const { username, email, password } = req.body;

    const userExistsQuery = 'SELECT * FROM users WHERE username = ? OR email = ?';
    db.get(userExistsQuery, [username, email], async (err, row) => {
        if (err) {
            return res.status(500).send('Error en la base de datos');
        }
        if (row) {
            return res.status(409).send('El usuario o correo electrónico ya está registrado');
        }

        const hash = await bcrypt.hash(password, saltRounds);
        const defaultImagePath = path.join(__dirname, '..', 'default', 'img.png'); // Asegúrate de que este sea el archivo correcto y la ruta sea correcta
        const userImageDir = path.join(__dirname, '..', 'uploads', username, 'profile-img');
        const userImagePath = path.join(userImageDir, 'profile.jpeg'); // Cambiando a formato .jpeg

        createFolder(userImageDir);

        try {
            await sharp(defaultImagePath)
                .jpeg({ quality: 80 }) // Convierte a JPEG con calidad del 80%
                .toFile(userImagePath);

            const insertUserQuery = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
            db.run(insertUserQuery, [username, email, hash], function(err) {
                if (err) {
                    return res.status(500).send('Error al registrar el usuario');
                }
                res.status(200).json({ userId: this.lastID });
            });
        } catch (error) {
            console.error('Error al procesar la imagen de perfil:', error);
            return res.status(500).json({ error: 'Error al procesar la imagen de perfil' });
        }
    });
});

// Endpoint para iniciar sesión
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const findUserQuery = 'SELECT * FROM users WHERE username = ?';
    db.get(findUserQuery, [username], (err, user) => {
        if (err) {
            return res.status(500).send('Error en la base de datos');
        }
        if (!user) {
            return res.status(404).send('Usuario no encontrado');
        }

        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                const token = jwt.sign(
                    { userId: user.id, username: user.username },
                    JWT_SECRET,
                    { expiresIn: '1h' }
                );

                res.json({ token, username: user.username, userId: user.id });
            } else {
                res.status(401).send('Contraseña incorrecta');
            }
        });
    });
});

module.exports = router;
