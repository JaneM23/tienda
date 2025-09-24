const oauthController = {
    googleCallback: (req, res) => {
        // Passport añade user y token en req.user
        const { user, token } = req.user;

        // Podrías redirigir a frontend con el token
        res.json({
            message: 'Login con Google exitoso',
            user,
            token
        });
    }
};

module.exports = oauthController;
