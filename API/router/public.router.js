const { Router } = require('express')
const path = require('path')

const router = Router()

// Ruta de inicio de sesión
router.post('/login', (req, res) => { res.sendFile(path.join(__dirname, '../../Public/Login.html'))})
// Ruta de inicio de aplicación 
router.post('/inicio', (req, res) => { res.sendFile(path.join(__dirname, '../../Public/usuario.html'))})

module.exports = router
