const express = require('express');
const router = express.Router();

const passport = require('../config/passport');
const authController = require('../controllers/authController');

// Login clásico (JWT)
router.post('/login', authController.login);

// Google OAuth (sin sesiones)
const hasGoogle = Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);

// Inicio → redirige a Google
router.get('/auth/google', (req, res, next) => {
  if (!hasGoogle) return res.status(503).json({ error: 'Google OAuth no configurado' });
  passport.authenticate('google', { scope: ['profile', 'email'], session: false })(req, res, next);
});

// Callback → genera JWT y redirige a "/"
router.get('/auth/google/callback', (req, res, next) => {
  if (!hasGoogle) return res.status(503).json({ error: 'Google OAuth no configurado' });

  passport.authenticate('google', { session: false }, (err, data, info) => {
    if (err) {
      console.error('[OAuth] Error authenticate:', err);
      return res.status(500).send('Error en autenticación con Google');
    }
    if (!data) {
      console.error('[OAuth] Sin user/token. info:', info);
      return res.redirect('/?google=fail');
    }

    const { token, user } = data;
    console.log('[OAuth] OK como:', user?.email || user?.username);

    const html = `<!doctype html>
<html><head><meta charset="utf-8"><title>Login Google</title>
<meta http-equiv="refresh" content="0;url=/" />
</head><body>
<script>
try {
  localStorage.setItem('jwtToken', ${JSON.stringify(token)});
  window.location.replace('/');
} catch (e) {
  document.write('Copia este token y vuelve a /:<br><pre>' + ${JSON.stringify(token)} + '</pre>');
}
</script>
Si no redirige, <a href="/">haz clic aquí</a>.
</body></html>`;

    res.set('Content-Type', 'text/html; charset=utf-8').send(html);
  })(req, res, next);
});

module.exports = router;
