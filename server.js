// server.js
require('dotenv').config();

const express = require('express');
const path = require('path');
const app = express();

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Passport antes de las rutas API
const passport = require('./config/passport');
app.use(passport.initialize());

// Rutas API
app.use('/api', require('./routes/authRoutes'));
app.use('/api', require('./routes/protectedRoutes')); // si la usas
app.use('/api', require('./routes/cartRoutes'));

// Raíz → siempre entrega la SPA en index.html
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Healthcheck
app.get('/health', (_req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
  console.log('[OAuth] Google habilitado:',
    !!process.env.GOOGLE_CLIENT_ID && !!process.env.GOOGLE_CLIENT_SECRET);
});
