const mysql = require('mysql')

// Clase que gestiona operaciones SQL con motor de base de datos MySQL
class MySQL {
    
    // Inicializa la conexión a la base de datos con las credenciales y obtiene la conexión, 
    // en caso de error retorna el error en la consola
    constructor() {
        this.pool = mysql.createPool({
            host: 'localhost',
            user: 'root',
            database: 'BBDD_Manzanas_Cuidado'
        })

        this.pool.getConnection((err, connection) => {
            if (err) {
                console.error(`Error al conectar con la base de datos: ${err}`);
            } else {
                console.log('Conexión a la base de datos establecida');
                connection.release()
            }
        })
    }

    // Método que ejecuta consultas o sentencias a la base de datos
    executeQuery(query, params) {
        return new Promise((resolve, reject) => {
            this.pool.query(query, params, (err, results) => {
                if(err) return reject(err)
                resolve(results)
            })
        })
    }

    // Método que cierra todas las conexiones en el pool
    closeConnection() {
        return new Promise((resolve, reject) => {
            this.pool.end(err => {
                if (err) {
                    console.error(`Error al cerrar la conexión: ${err}`)
                    return reject(err)
                }
                console.log('Conexión a la base de datos cerrada')
                resolve()
            })
        })
    }
}

module.exports = MySQL