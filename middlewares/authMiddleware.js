const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwtConfig');

module.exports = (req, res, next) => {
  const hdr = req.headers.authorization || '';
  const [scheme, token] = hdr.split(' ');
  if (!token || !/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }
  jwt.verify(token, secret, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Token inválido o expirado' });
    req.user = decoded;
    next();
  });
};
