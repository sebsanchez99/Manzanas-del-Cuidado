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

module.exports = router