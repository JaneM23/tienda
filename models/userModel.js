 // Modelo de usuario (simulado sin base de datos)
class UserModel {
    // Buscar usuario por credenciales
    static findByCredentials(username, password) {
        // Usuarios de prueba (en producción usar base de datos)
        const users = [
            { id: 1, username: 'admin', password: 'admin123', role: 'admin' },
            { id: 2, username: 'cliente', password: 'cliente123', role: 'user' }
        ];
        
        // Buscar usuario que coincida
        return users.find(user => 
            user.username === username && 
            user.password === password
        );
    }
}

module.exports = UserModel;