const passport = require('passport')
const localStrategy = require('./strategies/local.strategy')
const MySQL = require('../../Libs/mysql')

passport.use(localStrategy)

passport.serializeUser((user, done) => {
    done(null, user.Usu_ID)
})

passport.deserializeUser(async (id, done) => {
    try {
        const mySQL = new MySQL()
        const query = 'SELECT * FROM Usuario WHERE Usu_ID = ?'
        const results = await mySQL.executeQuery(query, [id]).finally(() => mySQL.closeConnection())

        if (results.length > 0) {
            done(null, results[0]) 
        } else {
            done(new Error('Usuario no encontrado'), null)
        }
    } catch (error) {
        done(error, null)
    }
})

module.exports = passport