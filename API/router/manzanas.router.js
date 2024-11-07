const { Router } = require('express')
const MySQL = require('../Libs/mysql')

const router = Router()

// http://localhost:3000/manzana/servicios
// Trae los servicios que tiene una manzana
router.get('/listarServicios', async (req, res) => {
    try {
        const mySQL = new MySQL()
        const { Man_ID } = req.user
        const query = 'SELECT s.Ser_ID, s.Ser_Nombre, s.Ser_Descripcion FROM Servicio s JOIN Manzana_Servicio ms ON s.Ser_ID = ms.Ser_ID JOIN Manzana m ON m.Man_ID = ms.Man_ID WHERE m.Man_ID = ?'
        const servicios = await mySQL.executeQuery(query, [Man_ID])
        res.json(servicios)
    } catch (error) {
        console.error(error);
        res.status(500)
    }
})

module.exports = router
