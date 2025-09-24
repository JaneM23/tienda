// config/jwtConfig.js
require('dotenv').config();

module.exports = {
  // Usa JWT_SECRET y, si no existe, permite KEY_SECRET para compatibilidad
  secret: process.env.JWT_SECRET || process.env.KEY_SECRET || 'dev_secret',
  expiresIn: '1h',
};
