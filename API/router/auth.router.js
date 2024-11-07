const { Router } = require('express')
const passport = require('passport')

const router = Router()

// http://localhost:3000/auth/login
// Autentica el usuario con la base de datos usando estrategia local de Passport
router.post('/login', passport.authenticate('local', { failureRedirect: '/public/login', successRedirect: '/public/inicio' }))

// http://localhost:3000/auth/logout
// Cierra la sesión del usuario y quema la cookie del usuario
router.post('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) {
            return res.status(500).json({ message: 'Error al cerrar sesión' })
        }
        req.session.destroy(() => {
            res.clearCookie('connect.sid')
            res.status(200).json({ message: 'Sesión cerrada exitosamente' })
        })
    })
})

module.exports = router