const { Router } = require('express')
const passport = require('passport')

const router = Router()

// http://localhost:3000/auth/login
// Autentica el usuario con la base de datos usando estrategia local de Passport
router.post('/login', passport.authenticate('local', { failureRedirect: '/public/login', successRedirect: '/public/inicio' }))

module.exports = router