const sqlite3 = require('sqlite3').verbose();
const DB_PATH = './db.db';

const db = new sqlite3.Database(DB_PATH, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) console.error(err.message);
    else console.log('Conectado a la base de datos SQLite.');
});

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, email TEXT, password TEXT, description TEXT, role TEXT DEFAULT 'basic')");

    // Agregamos la columna 'tags' a la tabla de foroposts.
    db.run("CREATE TABLE IF NOT EXISTS foroposts (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, content TEXT, author TEXT, date TEXT, images TEXT, tags TEXT)");
});

module.exports = db;
