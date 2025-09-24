// controllers/authController.js
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');   // ← usa la clase, no un array
const { secret, expiresIn } = require('../config/jwtConfig');

exports.login = (req, res) => {
  const { username, password } = req.body;

  // buscar usuario con el método del modelo
  const user = UserModel.findByCredentials(username, password);
  if (!user) return res.status(401).json({ error: 'Credenciales inválidas' });

  const payload = { id: user.id, username: user.username, role: user.role };
  const token = jwt.sign(payload, secret, { expiresIn });

  res.json({ token });
};
