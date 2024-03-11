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
