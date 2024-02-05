// En tu archivo de rutas, por ejemplo, userRoutes.js

const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Configura el almacenamiento de Multer
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // Asegúrate de que este directorio exista
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Ruta para actualizar la imagen de perfil del usuario
router.post('/profile/upload', upload.single('profileImage'), (req, res) => {
    // Aquí puedes actualizar la base de datos con la ruta del archivo cargado para el usuario
    // req.file.path contiene la ruta del archivo cargado
    res.send({ message: 'Imagen cargada con éxito', filePath: req.file.path });
});

module.exports = router;
