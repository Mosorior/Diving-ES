const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();
const port = 3001;

// Configurar CORS para permitir solicitudes desde el puerto 3000
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(bodyParser.json());

// Servir archivos estáticos desde la carpeta 'uploads'
app.use('/uploads', express.static('uploads'));

// Rutas
app.use('/api/users', userRoutes);  // Prefijo '/api/users' para rutas de usuario
app.use('/api/posts', postRoutes);  // Prefijo '/api/posts' para rutas de posts

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).send('Route not found');
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});







/*
AWS

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

// Rutas
app.use(userRoutes);
app.use('/api/posts', postRoutes);

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
*/