const express = require('express');
const mongoose = require('mongoose');
require('./db'); // Asegúrate de que la ruta sea correcta según tu estructura
const authRoutes = require('./rutas/authRoutes');
require('dotenv').config({ path: '../TestSECRET.env' }); // Ajusta la ruta según sea necesario


const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // Para parsear el cuerpo de las solicitudes JSON

// Usar rutas de autenticación
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
