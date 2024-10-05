const express = require('express')
const cors = require('cors')
const path = require('path')
const router = require('./router/router')

const app = express()
const PORT = 3000

app.use(cors())

app.use(express.json())

// Sirve las rutas estáticas de la aplicación
app.use('/', express.static(path.join(__dirname, '../Public')))
// Parsea los datos de los formularios enviado en una solicitud HTTP con el método POST
app.use(express.urlencoded({ extended: true }))
// Usa las rutas establecidas dentro de la API
app.use(router)

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})