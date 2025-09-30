// app.js
require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');

// Passport y rutas
const passport = require('./config/passport');
const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes'); // si no la usas, quítala
const cartRoutes = require('./routes/cartRoutes');

function createApp() {
  const app = express();

  // Middlewares base
  app.use(express.json());
  app.use(cors());
  app.use(helmet());

  // Archivos estáticos para la SPA
  app.use(express.static(path.join(__dirname, 'public')));

  // Passport antes de las rutas
  app.use(passport.initialize());

  // Rutas API
  app.use('/api', authRoutes);
  app.use('/api', protectedRoutes); // comenta si no la usas
  app.use('/api', cartRoutes);

  // Healthcheck (para tests/monitoreo)
  app.get('/health', (_req, res) => res.json({ ok: true }));

  // Raíz → entrega la SPA
  app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

  // Manejo de errores central
  // eslint-disable-next-line no-unused-vars
  app.use((err, _req, res, _next) => {
    res.status(err.status || 500).json({ error: err.message || 'Error interno' });
  });

  return app;
}

module.exports = { createApp };
