const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../database'); // Asegura que la ruta sea correcta
require('dotenv').config({ path: './TestSECRET.env' }); // Asegura que esta línea esté al inicio de tu archivo server.js o aquí si es necesario

const router = express.Router();

// Verifica que JWT_SECRET está definido
if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET no está definido. Asegúrate de que TestSECRET.env esté configurado correctamente.");
    process.exit(1); // Detiene la ejecución si JWT_SECRET no está definido
}

const JWT_SECRET = process.env.JWT_SECRET;

router.post('/registro', async (req, res) => {
    const { username, email, password, rol } = req.body;
    try {
        const userExists = await new Promise((resolve, reject) => {
            db.get(`SELECT * FROM usuarios WHERE username = ? OR email = ?`, [username, email], (err, row) => {
                if (err) reject(err);
                resolve(row ? true : false);
            });
        });
        const express = require('express');
        const multer = require('multer');
        const bcrypt = require('bcrypt');
        const jwt = require('jsonwebtoken');
        const cors = require('cors');
        const sqlite3 = require('sqlite3').verbose();
        const fs = require('fs');
        const path = require('path');
        require('dotenv').config();
        
        const app = express();
        const port = process.env.PORT || 3000;
        
        app.use(cors());
        app.use(express.json());
        app.use('/uploads', express.static('uploads'));
        
        const db = new sqlite3.Database('./mydb.sqlite3', (err) => {
          if (err) {
            console.error('Error opening database', err.message);
          } else {
            console.log('Database connected.');
            db.run(`
              CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE,
                email TEXT UNIQUE,
                password TEXT,
                profileImagePath TEXT
              )
            `, (err) => {
              if (err) console.error('Error creating table', err.message);
            });
          }
        });
        
        // Multer setup for profile image upload
        const storage = multer.diskStorage({
          destination: (req, file, cb) => {
            const uploadPath = 'uploads/';
            fs.mkdirSync(uploadPath, { recursive: true });
            cb(null, uploadPath);
          },
          filename: (req, file, cb) => {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
          }
        });
        
        const upload = multer({ storage: storage });
        
        app.post('/register', async (req, res) => {
          const { username, email, password } = req.body;
          try {
            const hashedPassword = await bcrypt.hash(password, 10);
            db.run('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword], function(err) {
              if (err) {
                res.status(500).json({ error: err.message });
                return;
              }
              const userId = this.lastInsertRowid;
              const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET, { expiresIn: '24h' });
              res.status(201).json({ token: token, userId: userId });
            });
          } catch (error) {
            res.status(500).json({ error: error.message });
          }
        });
        
        app.post('/login', async (req, res) => {
          const { username, password } = req.body;
          db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
            if (err) {
              res.status(500).json({ error: err.message });
              return;
            }
            if (user) {
              const match = await bcrypt.compare(password, user.password);
              if (match) {
                const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
                res.json({ token: token, userId: user.id });
              } else {
                res.status(401).json({ error: 'Authentication failed' });
              }
            } else {
              res.status(404).json({ error: 'User not found' });
            }
          });
        });
        
        app.post('/uploadProfileImage', upload.single('profileImage'), (req, res) => {
          const userId = req.body.userId;
          const profileImagePath = req.file.path;
          db.run('UPDATE users SET profileImagePath = ? WHERE id = ?', [profileImagePath, userId], (err) => {
            if (err) {
              res.status(500).json({ error: err.message });
              return;
            }
            res.json({ message: 'Profile image updated successfully', path: profileImagePath });
          });
        });
        
        app.listen(port, () => {
          console.log(`Server running on port ${port}`);
        });
        
        if (userExists) {
            return res.status(400).json({ mensaje: 'El usuario ya existe.' });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const result = await new Promise((resolve, reject) => {
            db.run(`INSERT INTO usuarios (username, email, passwordHash, rol, imagenPerfil) VALUES (?, ?, ?, ?, ?)`, 
            [username, email, passwordHash, rol || 'usuario', './img/defaultProfile.png'], function(err) {
                if (err) reject(err);
                resolve({ id: this.lastID });
            });
        });

        const token = jwt.sign({ id: result.id, username, rol: rol || 'usuario' }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, usuario: { id: result.id, username, rol: rol || 'usuario' } });

    } catch (error) {
        res.status(500).json({ mensaje: 'Error al registrar el usuario.', error: error.message });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log("Intentando iniciar sesión con:", "Username:", username, "Password:", password);

    if (!username || !password) {
        return res.status(400).json({ mensaje: 'Se requieren nombre de usuario y contraseña.' });
    }

    try {
        const usuario = await new Promise((resolve, reject) => {
            db.get(`SELECT * FROM usuarios WHERE username = ?`, [username], (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
        });

        if (!usuario) {
            console.log("Usuario no encontrado:", username);
            return res.status(400).json({ mensaje: 'Credenciales inválidas.' });
        }

        const esContraseñaCorrecta = await bcrypt.compare(password, usuario.passwordHash);
        if (!esContraseñaCorrecta) {
            console.log("Contraseña incorrecta para el usuario:", username);
            return res.status(400).json({ mensaje: 'Credenciales inválidas.' });
        }

        const token = jwt.sign({ id: usuario.id, username: usuario.username, rol: usuario.rol }, JWT_SECRET, { expiresIn: '1h' });
        console.log("Inicio de sesión exitoso:", username);
        res.json({ token, usuario: { id: usuario.id, username: usuario.username, rol: usuario.rol } });

    } catch (error) {
        console.error("Error al procesar la solicitud:", error);
        return res.status(500).json({ mensaje: 'Error al procesar la solicitud de inicio de sesión.' });
    }
});

module.exports = router;
