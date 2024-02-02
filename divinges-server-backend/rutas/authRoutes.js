const express = require('express');
const { Usuario } = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Ruta de registro
router.post('/registro', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Verificar si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({ $or: [{ username }, { email }] });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El usuario ya existe.' });
    }

    // Crear un nuevo usuario
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const nuevoUsuario = new Usuario({
      username,
      email,
      passwordHash,
    });

    // Guardar el usuario en la base de datos
    await nuevoUsuario.save();

    // Generar y enviar el token
    const token = jwt.sign({ usuario: { id: nuevoUsuario._id } }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, usuario: { id: nuevoUsuario._id, username: nuevoUsuario.username } });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error del servidor');
  }
});

// Ruta de inicio de sesión
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Verificar si el usuario existe
    const usuario = await Usuario.findOne({ username });
    if (!usuario) {
      return res.status(400).json({ mensaje: 'Credenciales inválidas.' });
    }

    // Verificar la contraseña
    const esContraseñaCorrecta = await bcrypt.compare(password, usuario.passwordHash);
    if (!esContraseñaCorrecta) {
      return res.status(400).json({ mensaje: 'Credenciales inválidas.' });
    }

    // Generar y enviar el token
    const token = jwt.sign({ usuario: { id: usuario._id } }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, usuario: { id: usuario._id, username: usuario.username } });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error del servidor');
  }
});

module.exports = router;
