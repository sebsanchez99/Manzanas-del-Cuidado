const { Router } = require('express')
const MySQL = require('../Libs/mysql')

const router = Router()

// http://localhost:3000/manzana/getManzanasInfo
router.get('/getManzanasInfo', async (req, res) => {
    try {
        const mySQL = new MySQL()
        const query = 'SELECT * FROM Manzana'
        const manzanas = await mySQL.executeQuery(query).finally(() => mySQL.closeConnection())
        res.status(200).json(manzanas)
    } catch (error) {
        console.log(error)
        res.status(500)        
    }
})

// http://localhost:3000/manzana/getManzanasServices
// Obtiene la información de una manzana en específico con los servicios que tiene y los que no
router.get('/getManzanasServices', async (req, res) => {
    try {
        const { Man_ID } = req.query
        const mySQL = new MySQL()
        const manzanaQuery = 'SELECT * FROM Manzana WHERE Man_ID = ?'
        const [manzana] = await mySQL.executeQuery(manzanaQuery, [Man_ID])
        const serviciosQuery = `
        SELECT 
            s.Ser_ID,
            s.Ser_Nombre,
            CASE WHEN ms.Man_ID IS NOT NULL THEN true ELSE false END AS checked
        FROM Servicio s
        LEFT JOIN Manzana_Servicio ms ON s.Ser_ID = ms.Ser_ID AND ms.Man_ID = ?
        ORDER BY s.Ser_ID
        `
        const serviciosArray = await mySQL.executeQuery(serviciosQuery, [Man_ID]).finally(() => mySQL.closeConnection())
        const servicios = serviciosArray.map(servicio => ({
            ...servicio,
            checked: servicio.checked == 1
        }))
        res.status(200).json({
            manzanaId: manzana.Man_ID,
            manzanaNombre: manzana.Man_Nombre,
            servicios
        })
    } catch (error) {
        console.log(error)
        res.status(500)        
    }
})

// http://localhost:3000/manzana/updateManzana
// Actualiza una manzana
router.put('/updateManzana', async (req, res) =>{
    try {
        const { manzanaID, manzanaName, servicios} = req.body
        const mySQL = new MySQL()
        const updateQuery = 'UPDATE Manzana SET Man_Nombre=? WHERE Man_ID=?'
        await mySQL.executeQuery(updateQuery, [manzanaName, manzanaID])
        const deleteQuery = 'DELETE FROM Manzana_Servicio WHERE Man_ID = ?'
        await mySQL.executeQuery(deleteQuery, [manzanaID])
        const insertQuery = 'INSERT INTO ManzanaServicio(Man_ID, Ser_ID) VALUES(?, ?)'
        const insertPromises = servicios
            .filter(servicio => servicio.checked)
            .map(servicio => mySQL.executeQuery(insertQuery, [manzanaID, servicio.id]))
        await Promise.all(insertPromises)
        await mySQL.closeConnection()
        res.status(200).json({ message: 'Manzana actualizada con éxito' });
    } catch (error) {
        console.error(error)
        res.status(500)   
    } 
})

module.exports = router