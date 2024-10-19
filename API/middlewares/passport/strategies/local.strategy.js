const { Strategy } = require('passport-local') 
const MySQL = require('../../../Libs/mysql')

// Busca usuario y contraseña en la base de datos
const localStrategy = new Strategy( { usernameField: 'Usu_Email', passwordField: 'Usu_Contrasena' }, async (email, password, done) => {
    try {
        const mySQL = new MySQL()
        const query = 'SELECT * FROM Usuario WHERE Usu_Email = ? AND Usu_Contrasena = ?'
        // Ejecuta la consulta para verificar email y contraseña
        const results = await mySQL.executeQuery(query, [email, password]).finally(() =>  mySQL.closeConnection())
        if (results.length === 0) {
          return done(null, false, { messages: 'Autenticación incorrecta' })
        }
        return done(null, true)
      } catch (error) {
        console.error(error)
        return done(error, false)
      }
    }
  )

module.exports = localStrategy