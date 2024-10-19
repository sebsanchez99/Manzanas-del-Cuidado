// Función middleware que verifica si el usuario está autenticado, si no lo está, devuelve al usuario al inicio
const isAuthenticated = (req, res, next)=> {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/')
}

module.exports = isAuthenticated