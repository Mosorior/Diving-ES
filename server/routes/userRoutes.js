const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const db = require('../config/db');

const router = express.Router();
const saltRounds = 10;
const JWT_SECRET = process.env.JWT_SECRET_KEY;

// Función auxiliar para crear carpetas si no existen
const createFolder = (folder) => {
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true });
    }
};

// Endpoint para registrar un nuevo usuario
router.post('/register', upload.single('profileImage'), async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const userExistsQuery = 'SELECT * FROM users WHERE username = ? OR email = ?';
    db.get(userExistsQuery, [username, email], async (err, row) => {
        if (err) {
            return res.status(500).json({ message: 'Error en la base de datos' });
        }
        if (row) {
            return res.status(409).json({ message: 'El usuario o correo electrónico ya está registrado' });
        }

        try {
            const hash = await bcrypt.hash(password, saltRounds);
            const defaultImagePath = path.join(__dirname, '..', 'default', 'img.png');
            const userImageDir = path.join(__dirname, '..', 'uploads', username, 'profile-img');
            const userImagePath = path.join(userImageDir, 'profile.jpg');

            createFolder(userImageDir);

            await sharp(defaultImagePath)
                .jpeg({ quality: 80 })
                .toFile(userImagePath);

            const insertUserQuery = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
            db.run(insertUserQuery, [username, email, hash], function(err) {
                if (err) {
                    return res.status(500).json({ message: 'Error al registrar el usuario' });
                }
                res.status(200).json({ userId: this.lastID });
            });
        } catch (error) {
            console.error('Error al procesar la imagen de perfil:', error);
            return res.status(500).json({ message: 'Error al procesar la imagen de perfil' });
        }
    });
});

// Endpoint para iniciar sesión
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const findUserQuery = 'SELECT * FROM users WHERE username = ?';
    db.get(findUserQuery, [username], (err, user) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Error en la base de datos' });
        }
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                console.error('Bcrypt error:', err);
                return res.status(500).json({ message: 'Error en la comparación de contraseñas' });
            }
            if (result) {
                const token = jwt.sign(
                    { userId: user.id, username: user.username },
                    JWT_SECRET,
                    { expiresIn: '1h' }
                );
                res.json({ token, username: user.username, userId: user.id });
            } else {
                res.status(401).json({ message: 'Contraseña incorrecta' });
            }
        });
    });
});

module.exports = router;
