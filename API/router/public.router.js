const { Router } = require('express')
const path = require('path')
const isAuthenticated = require('../middlewares/authentication')

const router = Router()

// Ruta de inicio de sesión
router.get('/login', (req, res) => { res.sendFile(path.join(__dirname, '../../Public/Login.html'))})
// Ruta de registro
router.get('/registro', (req, res) => { res.sendFile(path.join(__dirname, '../../Public/Registrarse.html'))})
// Ruta de inicio de aplicación 
router.get('/inicio', isAuthenticated, (req, res) => { res.sendFile(path.join(__dirname, '../../Public/usuario.html')) })

module.exports = router
