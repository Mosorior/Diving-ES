const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const sharp = require('sharp');
const app = express();
const saltRounds = 10;

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));
const JWT_SECRET = 'hYfTmtt9jvfH*tsWRHo8A*ArtD@z#8PKp!qZJK&Y#VTtZP8Y^c';

const createFolder = (folder) => {
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true });
    }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const username = req.query.username;
        if (!username) {
            return cb(new Error('Nombre de usuario no proporcionado'));
        }
        const folder = `uploads/${username}/profile-img/`;
        createFolder(folder);
        cb(null, folder);
    },
    filename: (req, file, cb) => {
        cb(null, 'profile.jpg');
    }
});

const upload = multer({ storage: storage });

const db = new sqlite3.Database('./db.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) console.error(err.message);
    else console.log('Conectado a la base de datos SQLite.');
});

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, email TEXT, password TEXT, description TEXT, role TEXT DEFAULT 'basic')", (err) => {
        if (err) console.error(err.message);
    });
    db.run("CREATE TABLE IF NOT EXISTS foroposts (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, content TEXT, author TEXT, date TEXT)", (err) => {
        if (err) console.error(err.message);
    });
});

// Endpoint para registrar un nuevo usuario
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    const userExistsQuery = 'SELECT * FROM users WHERE username = ? OR email = ?';
    db.get(userExistsQuery, [username, email], (err, row) => {
        if (err) {
            return res.status(500).send('Error en la base de datos');
        }
        if (row) {
            return res.status(409).send('El usuario o correo electrónico ya está registrado');
        }

        bcrypt.hash(password, saltRounds, async (err, hash) => {
            if (err) {
                return res.status(500).send('Error al encriptar la contraseña');
            }

            const defaultImagePath = path.join(__dirname, 'default', 'img.png'); // Asegúrate de que este es el archivo correcto
            const userImageDir = path.join(__dirname, 'uploads', username, 'profile-img');
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
});


// Endpoint para iniciar sesión
app.post('/login', (req, res) => {
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
                // Construye la ruta de la imagen de perfil basada en el nombre de usuario
                // Ajusta esta ruta según cómo estés almacenando las imágenes
                const profileImagePath = `/uploads/${username}/profile-img/profile.jpg`;

                const token = jwt.sign(
                    { userId: user.id, username: user.username, profileImagePath },
                    JWT_SECRET,
                    { expiresIn: '1h' }
                );

                // Incluye la ruta de la imagen de perfil en la respuesta
                res.json({
                    token,
                    username: user.username,
                    userId: user.id,
                    profileImagePath // Asegúrate de que el cliente sepa manejar este campo
                });
            } else {
                res.status(401).send('Contraseña incorrecta');
            }
        });
    });
});



const port = 3001;
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
