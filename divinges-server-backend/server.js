const express = require('express');
const cors = require('cors');
require('./database');
const authRoutes = require('./rutas/authRoutes');
require('dotenv').config({ path: './TestSECRET.env' }); 

const app = express();
const PORT = process.env.PORT || 5000;

// Configuración de CORS para permitir solicitudes desde el frontend
app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(express.json()); // Para parsear el cuerpo de las solicitudes JSON

// Usar rutas de autenticación
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
