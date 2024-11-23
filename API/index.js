const express = require('express')
const session = require('express-session')
const cors = require('cors')
const path = require('path')
const router = require('./router/router')
const passport = require('./middlewares/passport')

const app = express()
const PORT = 3000

app.use(cors())

app.use(express.json())

// Configura middleware de sesión
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}))
// Sirve las rutas estáticas de la aplicación
app.use('/', express.static(path.join(__dirname, '../Public')))

// Deshabilita el cache en el navegador
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Surrogate-Control', 'no-store');
    next();
});

// Parsea los datos de los formularios enviado en una solicitud HTTP con el método POST
app.use(express.urlencoded({ extended: true }))
// Usa middleware passport con estrategias definidas en archivo principal de passport
app.use(passport.initialize())
app.use(passport.session())
// Usa las rutas establecidas dentro de la API
app.use(router)

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})