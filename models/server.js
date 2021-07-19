const express = require('express');
const cors = require('cors');
require('colors');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //Middlewares
        this.middlewares();
        //Rutas de mi aplicacion
        this.routes();
    }

    middlewares() {
        //CORS
        this.app.use(cors());

        //Lectura y Parseo del body
        this.app.use(express.json());

        //Directorio Públic
        //Tiene prioridad lo que se encuentre en Public.
        this.app.use(express.static('public'));
    }

    routes() {
        //Con este midleware le decimos que todo lo que entre por "/api/usuarios", utilice la constante router de user.js donde hemos configuradao cada tipo de conexión y sus funciones
        this.app.use('/api/usuarios', require('../routers/user'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`A la escucha en el puerto ${this.port}`.magenta);
        });
    }
}

module.exports = Server;
