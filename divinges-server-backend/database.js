const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const path = require('path');
const dbPath = path.resolve(__dirname, 'foroBuceo.db');
const defaultProfileImagePath = path.join('./img/img.png');


const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error('Error al conectar con la base de datos SQLite', err.message);
    } else {
        console.log('Conectado a la base de datos SQLite foroBuceo.');
        db.run(`CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            email TEXT NOT NULL UNIQUE,
            passwordHash TEXT NOT NULL,
            rol TEXT DEFAULT 'usuario',
            imagenPerfil TEXT DEFAULT '${defaultProfileImagePath}'
        )`, (err) => {
            if (err) console.error('Error al crear la tabla usuarios', err.message);
            else console.log("Tabla 'usuarios' creada correctamente.");
        });

        db.run(`CREATE TABLE IF NOT EXISTS temas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT NOT NULL,
            descripcion TEXT,
            creador INTEGER,
            FOREIGN KEY (creador) REFERENCES usuarios(id)
        )`, (err) => {
            if (err) console.error('Error al crear la tabla temas', err.message);
            else console.log("Tabla 'temas' creada correctamente.");
        });

        db.run(`CREATE TABLE IF NOT EXISTS publicaciones (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            contenido TEXT NOT NULL,
            autor INTEGER,
            tema INTEGER,
            FOREIGN KEY (autor) REFERENCES usuarios(id),
            FOREIGN KEY (tema) REFERENCES temas(id)
        )`, (err) => {
            if (err) console.error('Error al crear la tabla publicaciones', err.message);
            else console.log("Tabla 'publicaciones' creada correctamente.");
        });
        if (!err){
            console.log("")
        console.log("Servidor corriendo... Ctrl+C para parar")
        }
        
    }
});

module.exports = db;
