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

// http://localhost:3000/manzana/updateManzana
router.put('/updateManzana', async (req, res) =>{
    try {
        const { Man_Nombre, ManID} = req.body
        const mySQL = new MySQL()
        const query = 'UPDATE Manzana SET Man_Nombre=? WHERE Man_ID=?'
        const result = await mySQL.executeQuery(query, [Man_Nombre, ManID]).finally(() => mySQL.closeConnection)
        if (result.affectedRows == 0) req.status(500)
            res.status(200).json({ message: 'Manzana actualizada correctamente' }) 
    } catch (error) {
        console.error(error)
        res.status(500)   
    } 
})

module.exports = router