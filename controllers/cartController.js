const CartModel = require('../models/cartModel');

// Cargar catálogo; si no existe models/productModel.js, usar fallback
let Catalog = [];
try {
  Catalog = require('../models/productModel'); // debe exportar array [{ productId, nombre, precio, stock, image }]
} catch {
  Catalog = [
    { productId: '1', nombre: 'The Witcher 3', precio: 29.99, stock: 99, image: '/images/witcher3.jpg' },
    { productId: '2', nombre: 'Cyberpunk 2077', precio: 59.99, stock: 99, image: '/images/cyberpunk2077.jpg' },
    { productId: '3', nombre: 'Minecraft',     precio: 19.99, stock: 99, image: '/images/minecraft.jpg' },
  ];
}

const findProduct = (id) => Catalog.find(p => String(p.productId) === String(id));

const controller = {
  getCart: (req, res) => {
    const cart = CartModel.getCart(req.user.id);
    return res.json(cart);
  },

  addItem: (req, res) => {
    const { productId, cantidad } = req.body;
    if (!productId || cantidad == null) return res.status(400).json({ error: 'Datos incompletos' });

    const qty = Number(cantidad);
    if (!Number.isFinite(qty) || qty <= 0) return res.status(400).json({ error: 'Cantidad debe ser mayor a 0' });

    const p = findProduct(productId);
    if (!p) return res.status(404).json({ error: 'Producto inexistente' });

    const cart = CartModel.getCart(req.user.id);
    const existente = cart.items.find(i => String(i.productId) === String(p.productId));
    const nuevaCantidad = (existente ? existente.cantidad : 0) + qty;
    if (p.stock != null && nuevaCantidad > Number(p.stock)) {
      return res.status(409).json({ error: 'Producto sin stock suficiente' });
    }

    const item = { productId: p.productId, nombre: p.nombre, precio: p.precio, cantidad: qty, image: p.image };
    const updated = CartModel.addItem(req.user.id, item);
    return res.json(updated);
  },

  updateItem: (req, res) => {
    const { productId } = req.params;
    const { cantidad } = req.body;

    if (cantidad == null) return res.status(400).json({ error: 'Cantidad requerida' });
    const qty = Number(cantidad);
    if (!Number.isFinite(qty) || qty < 0) return res.status(400).json({ error: 'Cantidad no puede ser negativa' });

    const p = findProduct(productId);
    if (!p) return res.status(404).json({ error: 'Producto inexistente' });

    const prev = CartModel.getCart(req.user.id);
    const estaba = prev.items.some(i => String(i.productId) === String(p.productId));
    if (!estaba) return res.status(404).json({ error: 'Producto no encontrado en carrito' });

    if (qty === 0) {
      const cart = CartModel.removeItem(req.user.id, p.productId);
      return res.json(cart);
    }

    if (p.stock != null && qty > Number(p.stock)) return res.status(409).json({ error: 'Producto sin stock suficiente' });

    const cart = CartModel.updateItem(req.user.id, p.productId, qty);
    return res.json(cart);
  },

  removeItem: (req, res) => {
    const { productId } = req.params;
    const p = findProduct(productId);
    if (!p) return res.status(404).json({ error: 'Producto inexistente' });

    const prev = CartModel.getCart(req.user.id);
    const estaba = prev.items.some(i => String(i.productId) === String(p.productId));
    if (!estaba) return res.status(404).json({ error: 'Producto no encontrado en carrito' });

    const cart = CartModel.removeItem(req.user.id, p.productId);
    return res.json(cart);
  },

  clearCart: (req, res) => {
    const cart = CartModel.clearCart(req.user.id);
    return res.json(cart);
  },

  checkout: (req, res) => {
    const cart = CartModel.getCart(req.user.id);
    if (!cart.items || cart.items.length === 0) {
      return res.status(400).json({ error: 'Carrito vacío' });
    }

    const order = {
      id: Date.now().toString(),
      userId: req.user.id,
      items: cart.items,
      total: cart.total,
      createdAt: new Date().toISOString(),
    };

    CartModel.clearCart(req.user.id);
    return res.json({ message: 'Compra realizada', order, items: [], total: 0 });
  }
};

module.exports = controller;

