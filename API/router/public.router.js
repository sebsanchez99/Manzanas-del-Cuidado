const { Router } = require('express')
const path = require('path')

const router = Router()

// Ruta de inicio de sesión
router.get('/login', (req, res) => { res.sendFile(path.join(__dirname, '../../Public/Login.html'))})
// Ruta de inicio de aplicación 
router.get('/inicio', (req, res) => { res.sendFile(path.join(__dirname, '../../Public/usuario.html'))})
// Ruta de registro
router.get('/registro', (req, res) => { res.sendFile(path.join(__dirname, '../../Public/Registrarse.html'))})

module.exports = router
