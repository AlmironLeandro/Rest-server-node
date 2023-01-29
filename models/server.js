const express = require('express');
var cors = require('cors');
const { dbConnection } = require('../database/config.db');
const path = require('../Paths/paths')






class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT
        // this.paths = {
        //     usuarios: '/api/usuarios',
        //     auth: '/api/auth',
        //     categorias: '/api/categorias'
        // }
        // console.log(path);
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
        this.app.use(path.auth, require('../routes/auth.route'))
        this.app.use(path.usuarios, require('../routes/user.route'))
        this.app.use(path.categorias, require('../routes/categoria.route'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('puerto', this.port);
        })
    }

}




module.exports = Server