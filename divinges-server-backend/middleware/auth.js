const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
  // Obtener el token del encabezado de la solicitud
  const token = req.header('Authorization');

  // Verificar si el token está presente
  if (!token) {
    return res.status(401).json({ mensaje: 'Acceso denegado. Token no proporcionado.' });
  }

  try {
    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded.usuario;
    next();
  } catch (error) {
    res.status(401).json({ mensaje: 'Token no válido.' });
  }
};

module.exports = verificarToken;
