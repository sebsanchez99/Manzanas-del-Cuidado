const { Router } = require('express')
const MySQL = require('../Libs/mysql')

const router = Router()

// http://localhost:3000/servicio/listarServiciosManzana
// Trae los servicios que tiene una manzana
router.get('/listarServiciosManzana', async (req, res) => {
    try {
        const mySQL = new MySQL()
        const { Man_ID } = req.user
        const query = `
        SELECT s.Ser_ID, s.Ser_Nombre, s.Ser_Descripcion 
        FROM Servicio s 
        JOIN Manzana_Servicio ms ON s.Ser_ID = ms.Ser_ID 
        JOIN Manzana m ON m.Man_ID = ms.Man_ID 
        WHERE m.Man_ID = ?`
        const servicios = await mySQL.executeQuery(query, [Man_ID]).finally(() => mySQL.closeConnection())
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
        const mySQL = new MySQL();
        const { Usu_ID } = req.user;
        const { servicios, fecha } = req.body;
        console.log('fecha: ',fecha);
        
        // Insertar en la tabla Usuario_Servicio para cada servicio seleccionado
        const insertPromises = servicios.map(idServicio => {
            const queryServicio = 'INSERT INTO Usuario_Servicio(Usu_ID, Ser_ID, fecha) VALUES(?, ?, ?)';
            return mySQL.executeQuery(queryServicio, [Usu_ID, idServicio, fecha]);
        });
        // Esperar a que todas las inserciones de servicios se completen
        const results = await Promise.all(insertPromises);
        // Verificar que todas las inserciones hayan sido exitosas
        if (results.some(result => result.affectedRows === 0)) {
            return res.status(500).json({ message: 'Error al guardar alguno de los servicios' });
        }
        await mySQL.closeConnection();
        res.status(200).json({ message: 'Operación exitosa' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});



// http://localhost:3000/servicio/listarServiciosUsuario
// Lista los servicios que el usuario tiene guardado
router.get('/listarServiciosUsuario', async (req, res) => {
    try {
        const mySQL = new MySQL()
        const { Usu_ID } = req.user
        const query = `
        SELECT s.Ser_ID, s.Ser_Nombre, s.Ser_Descripcion, us.Fecha
        FROM Servicio s
        JOIN Usuario_Servicio us ON s.Ser_ID = us.Ser_ID
        JOIN Usuario u ON u.Usu_ID = us.Usu_ID
        WHERE u.Usu_ID = ?`
        const serviciosUsuario = await mySQL.executeQuery(query, [Usu_ID]).finally(() => mySQL.closeConnection())
        res.json(serviciosUsuario)
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error interno del servidor'})     
    }
})

// http://localhost:3000/servicio/eliminarServicio
// Elimina un servicio en específico
router.delete('/eliminarServicio', async (req, res) => {
    try {
        const mySQL = new MySQL()
        const { Usu_ID } = req.user
        const { servicioID, fecha } = req.body
        const formattedDate = new Date(fecha).toISOString().split('T')[0]
        
        const query = 'DELETE FROM Usuario_Servicio WHERE Usu_ID = ? AND Ser_ID = ? AND fecha = ?'
        const { affectedRows } = await mySQL.executeQuery(query, [Usu_ID, servicioID, formattedDate]).finally(() => mySQL.closeConnection())
        affectedRows > 0 ? res.status(200).json({ message: 'Servicio eliminado exitosamente' }) : res.status(404).json({ message: 'Servicio no encontrado' }) 
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error interno del servidor'}) 
    }
})

module.exports = router
