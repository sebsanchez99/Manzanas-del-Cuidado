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
        res.json(users)
    } catch (error) {
        console.error(error);
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
        console.error(error);
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
        console.error(error);
        res.status(500)    
    }
})


router.post('/ceateService', async (req, res) => {
    try {
    } catch (error) {
        
    }
})
module.exports = router