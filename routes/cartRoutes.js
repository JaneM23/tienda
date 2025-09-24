const express = require('express');
const router = express.Router();

const auth = require('../middlewares/authMiddleware');
const cartController = require('../controllers/cartController');

// Rutas del carrito (protegidas por JWT/OAuth)
router.get('/carrito', auth, cartController.getCart);
router.post('/carrito/add', auth, cartController.addItem);
router.put('/carrito/update/:productId', auth, cartController.updateItem);
router.delete('/carrito/remove/:productId', auth, cartController.removeItem);
router.delete('/carrito/clear', auth, cartController.clearCart);
router.post('/carrito/checkout', auth, cartController.checkout);

module.exports = router;
