const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../database'); // Asegúrate de que la ruta sea correcta

const router = express.Router();

// Asumiendo que has definido JWT_SECRET en tu archivo .env
const JWT_SECRET = process.env.JWT_SECRET || 'tu_jwt_secret';

// Ruta de registro
router.post('/registro', (req, res) => {
    const { username, email, password, rol } = req.body;
    // Verificar si el usuario ya existe
    db.get(`SELECT * FROM usuarios WHERE username = ? OR email = ?`, [username, email], async (err, row) => {
        if (err) {
            return res.status(500).json({ mensaje: 'Error al consultar la base de datos.' });
        }
        if (row) {
            return res.status(400).json({ mensaje: 'El usuario ya existe.' });
        } else {
            // Crear un nuevo usuario
            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(password, salt);
            db.run(`INSERT INTO usuarios (username, email, passwordHash, rol) VALUES (?, ?, ?, ?)`, [username, email, passwordHash, rol || 'usuario'], function(err) {
                if (err) {
                    return res.status(500).json({ mensaje: 'Error al registrar el usuario.' });
                }
                const userId = this.lastID;
                // Generar y enviar el token
                const token = jwt.sign({ id: userId, username, rol: rol || 'usuario' }, JWT_SECRET, { expiresIn: '1h' });
                res.json({ token, usuario: { id: userId, username, rol: rol || 'usuario' } });
            });
        }
    });
});

// Ruta de inicio de sesión
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Verificar si el usuario existe
    db.get(`SELECT * FROM usuarios WHERE username = ?`, [username], async (err, usuario) => {
        if (err) {
            return res.status(500).json({ mensaje: 'Error al consultar la base de datos.' });
        }
        if (!usuario) {
            return res.status(400).json({ mensaje: 'Credenciales inválidas.' });
        }
        // Verificar la contraseña
        const esContraseñaCorrecta = await bcrypt.compare(password, usuario.passwordHash);
        if (!esContraseñaCorrecta) {
            return res.status(400).json({ mensaje: 'Credenciales inválidas.' });
        }
        // Generar y enviar el token
        const token = jwt.sign({ id: usuario.id, username: usuario.username, rol: usuario.rol }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, usuario: { id: usuario.id, username: usuario.username, rol: usuario.rol } });
    });
});

module.exports = router;
