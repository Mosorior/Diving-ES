const sqlite3 = require('sqlite3').verbose();

const DB_PATH = './db.db'; // Asegúrate de que esta ruta sea la correcta para tu base de datos.

const db = new sqlite3.Database(DB_PATH, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) console.error(err.message);
    else console.log('Conectado a la base de datos SQLite.');
});

// Usando db.serialize para asegurar que las sentencias se ejecutan en serie.
db.serialize(() => {
    // Crear tabla de usuarios si no existe.
    db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, email TEXT, password TEXT, description TEXT, role TEXT DEFAULT 'basic')", (err) => {
        if (err) console.error(err.message);
    });

    // Crear tabla de foroposts si no existe, incluyendo la nueva columna 'images'.
    db.run("CREATE TABLE IF NOT EXISTS foroposts (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, content TEXT, author TEXT, date TEXT, images TEXT)", (err) => {
        if (err) console.error(err.message);
    });
});

module.exports = db;
