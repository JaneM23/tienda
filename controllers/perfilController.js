// Controlador para rutas protegidas
const perfilController = {
    // Obtener perfil de usuario
    getProfile: (req, res) => {
        try {
            // Datos de ejemplo para la tienda de videojuegos
            const perfilUsuario = {
                username: req.user.username,
                role: req.user.role,
                juegosFavoritos: ['The Witcher 3', 'Cyberpunk 2077', 'Minecraft'],
                saldo: 150.75,
                ultimasCompras: [
                    { juego: 'Elden Ring', precio: 59.99 },
                    { juego: 'FIFA 23', precio: 49.99 }
                ]
            };
            
            res.json({
                message: 'Acceso autorizado a perfil protegido',
                perfil: perfilUsuario
            });
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener perfil' });
        }
    }
};

module.exports = perfilController;