const mongoose = require('mongoose');

// Conexión a la base de datos
mongoose.connect('mongodb://localhost:27017/foroBuceo', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => console.log('Conexión a MongoDB: Éxito'))
  .catch(err => console.error('Conexión a MongoDB: Error', err));

// Esquema y modelo para Usuario
const usuarioSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  // Añade más campos según sea necesario
}, { timestamps: true });

const Usuario = mongoose.model('Usuario', usuarioSchema);

// Esquema y modelo para Tema
const temaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: String,
  creador: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
}, { timestamps: true });

const Tema = mongoose.model('Tema', temaSchema);

// Esquema y modelo para Publicación
const publicacionSchema = new mongoose.Schema({
  contenido: { type: String, required: true },
  autor: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  tema: { type: mongoose.Schema.Types.ObjectId, ref: 'Tema' },
}, { timestamps: true });

const Publicacion = mongoose.model('Publicacion', publicacionSchema);

// Exportar los modelos
module.exports = { Usuario, Tema, Publicacion };
