const { Router } = require('express')
const path = require('path')
const isAuthenticated = require('../middlewares/authentication')

const router = Router()

// Ruta de inicio de sesión
router.get('/login', (req, res) => { res.sendFile(path.join(__dirname, '../../Public/Login.html'))})
// Ruta de registro
router.get('/registro', (req, res) => { res.sendFile(path.join(__dirname, '../../Public/Registrarse.html'))})
// Ruta de inicio de aplicación 
router.get('/inicio', isAuthenticated, (req, res) => { res.sendFile(path.join(__dirname, '../../Public/Views/Inicio.html')) })
//Ruta de administración de usuarios
router.get('/usuarios', isAuthenticated, (req, res) => { res.sendFile(paht.join(__dirname,'../../Public/Usuarios.html')) })

module.exports = router
