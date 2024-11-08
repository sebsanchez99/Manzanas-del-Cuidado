const { Router } = require('express')
const MySQL = require('../Libs/mysql')

const router = Router()

// http://localhost:3000/servicio/listarServiciosManzana
// Trae los servicios que tiene una manzana
router.get('/listarServiciosManzana', async (req, res) => {
    try {
        const mySQL = new MySQL()
        const { Man_ID } = req.user
        const query = 'SELECT s.Ser_ID, s.Ser_Nombre, s.Ser_Descripcion FROM Servicio s JOIN Manzana_Servicio ms ON s.Ser_ID = ms.Ser_ID JOIN Manzana m ON m.Man_ID = ms.Man_ID WHERE m.Man_ID = 1'
        const servicios = await mySQL.executeQuery(query, [Man_ID]).finally(mySQL.closeConnection())
        res.json(servicios)
    } catch (error) {
        console.error(error);
        res.status(500)
    }
})

// http://localhost:3000/servicio/guardarServicios
// Guarda los servicios que seleccionó el usuario
router.post('/guardarServicios', async (req, res) => {
    try {
        const mySQL = new MySQL()
        // TODO: Ejecutar query por cada servicio
        const { servicios } = req.body
        servicios.array.forEach(element => {
            
        });
        const { Usu_ID } = req.user
        const query = 'INSERT INTO Solicitud(Sol_Fecha, Ser_ID) VALUES(?,?)'
        const resultadoSolicitud = await mySQL.executeQuery(query, [Ser_ID, Sol_Fecha]).finally(mySQL.closeConnection())
        const solID = resultadoSolicitud.insertID
        const queryUsuario = 'INSERT INTO Usuario(Sol_ID) VALUES(?) WHERE Usu_ID = ?'
        const resultadoUsuario = await mySQL.executeQuery(queryUsuario, [solID, Usu_ID])
        if (resultadoUsuario.affectedRows > 0) {
            res.statusCode(200).json({message: 'Operación exitosa'})
        } else {
            res.statusCode(500).json({message: 'Error interno del servidor'})
        }
    } catch (error) {
        console.error(error);
        res.statusCode(500).json({message: 'Error interno del servidor'})
    }
})

// http://localhost:3000/servicio/listarServiciosUsuario
// Lista los servicios que el usuario tiene guardado
router.get('/listarServiciosUsuario', async (req, res) => {
    try {
        const mySQL = new MySQL()
        const { Usu_ID } = req.user
        const query = 'SELECT s.Ser_ID, s.Ser_Nombre, s.Ser_Descripcion, so.Sol_Fecha FROM Servicio s JOIN Solicitud so ON s.Ser_ID = so.Ser_ID JOIN Usuario u ON u.Sol_ID = so.Sol_ID WHERE Usu_ID = ?'
        const serviciosUsuario = await mySQL.executeQuery(query, [Usu_ID])
        res.json(serviciosUsuario)
    } catch (error) {
        console.error(error);
        res.statusCode(500).json({message: 'Error interno del servidor'})     
    }
})
module.exports = router
