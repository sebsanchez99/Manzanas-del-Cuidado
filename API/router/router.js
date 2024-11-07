// Archivo que contiene las rutas secundarias de la API
const { Router } = require('express')
const userRouter = require('./user.router')
const authRouter = require('./auth.router')
const publicRouter = require('./public.router')
const adminRouter = require('./admin.router')
const manzanasRouter = require('./manzanas.router')
const isAuthenticated = require('../middlewares/authentication')

const router = Router()

// Ruta para manejar las operaciones relacionadas con los usuarios
router.use('/user', userRouter)

// Ruta para manejar las operaciones de autenticación y autorización
router.use('/auth', authRouter)

// Ruta para manejar vistas de interfaz de usuario
router.use('/public', publicRouter)

// Ruta para operaciones relacionadas con administración de la aplicación
router.use('/admin', isAuthenticated, adminRouter)

// Ruta para operaciones relacionadas con los servicios de la manzana
router.use('/manzana'/* , isAuthenticated */, manzanasRouter)

module.exports = router