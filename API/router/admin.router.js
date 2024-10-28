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

module.exports = router