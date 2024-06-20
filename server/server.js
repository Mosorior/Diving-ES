const https = require('https');
const fs = require('fs');
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

// Configuración de HTTPS con Certbot
const privateKeyPath = '/etc/letsencrypt/live/diving.com.es/privkey.pem';
const certificatePath = '/etc/letsencrypt/live/diving.com.es/fullchain.pem';

const credentials = {
  key: fs.readFileSync(privateKeyPath, 'utf8'),
  cert: fs.readFileSync(certificatePath, 'utf8')
};

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(port, () => {
  console.log(`Servidor Node.js corriendo en https://localhost:${port}`);
});