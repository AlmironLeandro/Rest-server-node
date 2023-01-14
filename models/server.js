const express = require('express');
var cors = require('cors');







class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT || 3000;
        this.usuariosPath = '/api/usuarios'
        // Middlewares
        this.middlewares()

        // Rutas de mi aplicación

        this.routes()
    }

    middlewares() {
        //CORS
        this.app.use(cors())

        //Directorio publico
        this.app.use(express.static('public'));
    }


    routes() {
        this.app.use(this.usuariosPath, require('../routes/user.route'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('puerto', this.port);
        })
    }

}




module.exports = Server
