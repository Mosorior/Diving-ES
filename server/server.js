const http = require('http'); // Cambiado de https a http
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();
const port = 3001; // Puerto para tu aplicación Node.js

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// Configuración de HTTP
const httpServer = http.createServer(app);

httpServer.listen(port, () => {
  console.log(`Servidor Node.js corriendo en http://localhost:${port}`);
});
