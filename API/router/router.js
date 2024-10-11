// Archivo que contiene las rutas secundarias de la API
const { Router } = require('express')
const userRouter = require('./user.router')
const authRouter = require('./auth.router')
const publicRouter = require('./public.router')

const router = Router()

// Ruta para manejar las operaciones relacionadas con los usuarios
router.use('/user', userRouter)

// Ruta para manejar las operaciones de autenticación y autorización
router.use('/auth', authRouter)

// Ruta para manejar vistas de interfaz de usuario
router.use('/public', publicRouter)

module.exports = router