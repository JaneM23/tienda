// routes/protectedRoutes.js
const express = require('express');
const router = express.Router();

// Están en la raíz del proyecto:
const authMiddleware = require('../middlewares/authMiddleware');     
const perfilController = require('../controllers/perfilController'); 


// Ruta protegida por JWT
router.get('/perfil', authMiddleware, perfilController.getProfile);

module.exports = router;
