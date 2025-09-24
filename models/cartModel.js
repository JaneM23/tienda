const carts = {}; // Objeto en memoria para simular carritos por usuario

class CartModel {
    static getCart(userId) {
        return carts[userId] || { items: [], total: 0 };
    }

    static addItem(userId, product) {
        const cart = this.getCart(userId);

        // Ver si el producto ya existe
        const existingItem = cart.items.find(item => item.productId === product.productId);
        if (existingItem) {
            existingItem.cantidad += product.cantidad;
        } else {
            cart.items.push(product);
        }

        // Recalcular total
        cart.total = cart.items.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);

        carts[userId] = cart;
        return cart;
    }

    static updateItem(userId, productId, cantidad) {
        const cart = this.getCart(userId);
        const item = cart.items.find(i => i.productId === productId);
        if (item) {
            item.cantidad = cantidad;
        }

        cart.total = cart.items.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
        return cart;
    }

    static removeItem(userId, productId) {
        let cart = this.getCart(userId);
        cart.items = cart.items.filter(i => i.productId !== productId);
        cart.total = cart.items.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
        carts[userId] = cart;
        return cart;
    }

    static clearCart(userId) {
        carts[userId] = { items: [], total: 0 };
        return carts[userId];
    }
}

module.exports = CartModel;
