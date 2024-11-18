const { Router } = require('express')
const MySQL = require('../Libs/mysql')

const router = Router()

// http://localhost:3000/admin/getUsers
// Obtiene información de los usuarios registrados en la aplicación
router.get('/getUsers', async (req, res) => {
    try {
        const mySQL = new MySQL()
        const query = 'SELECT Usu_ID, Usu_Nombre, Usu_Email FROM Usuario'
        const users = await mySQL.executeQuery(query).finally(() => mySQL.closeConnection())
        res.status(200).json(users)
    } catch (error) {
        console.error(error)
        res.status(500)
    }
})

// http://localhost:3000/admin/deleteUser
// Elimina un usuario
router.delete('/deleteUser', async (req, res) => {
    try {
        const { userID } = req.body
        const mySQL = new MySQL()
        const query = 'DELETE FROM Usuario WHERE Usu_ID = ?'
        const result = await mySQL.executeQuery(query, [userID]).finally(() => mySQL.closeConnection())
        if (result.affectedRows == 0) req.status(500)
        res.status(200).json({ message: 'Usuario eliminado correctamente' })
    } catch (error) {
        console.error(error)
        res.status(500)        
    }
})

// http://localhost:3000/admin/editUser
// Actualiza los registros de un usuario
router.put('/editUser', async (req, res) => {
    try {
        const { userID, userName, userEmail,  } = req.body
        const mySQL = new MySQL()
        const query = 'UPDATE Usuario SET Usu_Nombre= ?, Usu_Email=? WHERE Usu_ID=?'
        const result = await mySQL.executeQuery(query, [userName, userEmail, userID]).finally(() => mySQL.closeConnection())
        if (result.affectedRows == 0) req.status(500)
        res.status(200).json({ message: 'Usuario actualizado correctamente' })
    } catch (error) {
        console.error(error)
        res.status(500)    
    }
})

// http://localhost:3000/admin/crearManzana
// Crea una manzana 
router.post('/crearManzana', async (req, res) => {
    try {
        const { nombreManzana, servicios } = req.body
        const mySQL = new MySQL()
        const query = 'INSERT INTO Manzana(Man_Nombre) VALUES(?)'
        const { insertId } = await mySQL.executeQuery(query, [nombreManzana])
        const insertPromises = servicios.map(idServicio => {
            const queryServicio = 'INSERT INTO Manzana_Servicio(Man_ID, Ser_ID) VALUES(?, ?)'
            return mySQL.executeQuery(queryServicio, [insertId, idServicio])
        })
        const results = await Promise.all(insertPromises)

        if (results.some(result => result.affectedRows === 0)) {
            return res.status(500).json({ message: 'Error al crear manzana' })
        }
        await mySQL.closeConnection()
        res.status(200).json({ message: 'Operación exitosa' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error al crear manzana' })          
    }
})

// http://localhost:3000/admin/deleteManzana
// Crea una manzana 
router.delete('/deleteManzana', async (req, res) => {
    try {
        const { Man_ID} = req.body
        const mySQL = new MySQL()
        const queryServicio = 'DELETE FROM Manzana_Servicio WHERE Man_ID = ?'
        const queryManzana = 'DELETE FROM Manzana WHERE Man_ID = ?'
        await mySQL.executeQuery(queryServicio, [Man_ID])
        await mySQL.executeQuery(queryManzana, [Man_ID]).finally(() => mySQL.closeConnection())
        res.status(200).json({ message: 'Manzana eliminada con éxito' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error al crear manzana' })          
    }
})


module.exports = router