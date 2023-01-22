const express = require('express');
var cors = require('cors');
const { dbConnection } = require('../database/config.db');







class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.usuariosPath = '/api/usuarios'
        this.authPath = '/api/auth';

        //conectar a base de datos
        this.conectarDB()
        // Middlewares
        this.middlewares()

        // Rutas de mi aplicación

        this.routes()
    }
    async conectarDB() {
        await dbConnection()
    }

    middlewares() {
        //CORS
        this.app.use(cors())

        // lectura y Parseo del body
        this.app.use(express.json());

        //Directorio publico
        this.app.use(express.static('public'));
    }


    routes() {
        this.app.use(this.authPath, require('../routes/auth.route'))
        this.app.use(this.usuariosPath, require('../routes/user.route'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('puerto', this.port);
        })
    }

}




module.exports = Server