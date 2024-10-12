const { Router } = require("express");
const MySQL = require("../Libs/mysql");
const router = Router();

// http://localhost:3000/user/register
// Registra el usuario en la base de datos
router.post("/register", async (req, res) => {
  try {
    const mySQL = new MySQL()
    const {
      TiD_ID,
      Usu_Documento,
      Usu_Nombre,
      Usu_Contrasena,
      Usu_Telefono,
      Usu_Email,
    } = req.body
    //Confirmar si el usuario existe
    const query = "SELECT * FROM Usuario WHERE Usu_Email = ?"
    const results = await mySQL.executeQuery(query, [Usu_Email])
    //En caso de que el usuario exista
    if (results.length > 0) {
      res.status(400).send(`
    <script>
        window.onload=function(){
            alert("Usuario ya existe")
            window.location.href='./index.html'
        }
    </script>
    `);
    }
    const registro = 'INSERT INTO Usuario (TiD_ID, Usu_Documento, Usu_Nombre, Usu_Contrasena, Usu_Telefono, Usu_Email) VALUES (?, ?, ?, ?, ?, ?)'
    const resultadoRegistro = await mySQL.executeQuery(registro, [TiD_ID, Usu_Documento, Usu_Nombre, Usu_Contrasena, Usu_Telefono, Usu_Email])
    //(Pendiente) validar datos
    
    if(resultadoRegistro.affectedRows == 1){
      res.redirect('/public/login')
    }

  } catch (error) {
    console.log(error)
    res.status(500)
  }
});

module.exports = router;
