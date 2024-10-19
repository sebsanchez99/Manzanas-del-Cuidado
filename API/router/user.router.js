const { Router } = require("express");
const MySQL = require("../Libs/mysql");
const isAuthenticated = require('../middlewares/authentication')

const router = Router();

// http://localhost:3000/user/register
// Registra el usuario en la base de datos
router.post("/register", async (req, res) => {
  try {
    const mySQL = new MySQL()
    const { TiD_ID, Man_ID, Usu_Documento, Usu_Nombre, Usu_Contrasena, Usu_Email } = req.body
    //Confirmar si el usuario existe
    const query = "SELECT * FROM Usuario WHERE Usu_Email = ?"
    const results = await mySQL.executeQuery(query, [Usu_Email])
    //En caso de que el usuario exista
    if (results.length > 0) {
      res.status(400).send(`
        <script>
            window.onload=function(){
                alert("Usuario ya existe")
                window.location.href='/public/registro'
            }
        </script>
      `)
    }
    const registro = 'INSERT INTO Usuario (TiD_ID, Usu_Documento, Usu_Nombre, Usu_Contrasena, Usu_Email, Man_ID) VALUES (?, ?, ?, ?, ?, ?)'
    const resultadoRegistro = await mySQL.executeQuery(registro, [TiD_ID, Usu_Documento, Usu_Nombre, Usu_Contrasena, Usu_Email, Man_ID])
      .finally(() =>  mySQL.closeConnection())
    if(resultadoRegistro.affectedRows == 1){
      res.send(`
        <script>
            window.onload=function(){
                alert("Registro exitoso")
                window.location.href='/public/login'
            }
        </script>
      `)
    }

  } catch (error) {
    console.log(error)
    res.status(500)
  }
});

// http://localhost:3000/user/infoUser
// Obtiene la información del usuario
router.get('/infoUser', isAuthenticated, (req,res) => {
  res.json(req.user)
})

module.exports = router;
