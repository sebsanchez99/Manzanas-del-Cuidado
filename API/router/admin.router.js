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
        res.status(200).json({ message: 'Usuaro eliminado correctamente' })
    } catch (error) {
        console.error(error);
        res.status(500)        
    }
})

module.exports = router