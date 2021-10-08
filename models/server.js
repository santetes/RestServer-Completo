const express = require('express');
const cors = require('cors');
require('colors');

//Método externo para la conexión con la base de datos mediante Mongoose
const { dbConexion } = require('../DataBase/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.path = {
            auth: '/api/auth',
            categorias: '/api/categorias',
            usuarios: '/api/usuarios',
            producto: '/api/productos',
            buscar: '/api/buscar',
        };

        //Conectar Base de Datos
        this.conectaBBDD();

        //Middlewares
        this.middlewares();

        //Rutas de mi aplicacion
        this.routes();
    }

    async conectaBBDD() {
        await dbConexion();
    }

    middlewares() {
        //CORS
        this.app.use(cors());

        //Lectura y Parseo del body cuando viene información en formato JSON en una petición Post put o delete
        this.app.use(express.json());

        //Directorio Públic
        //Tiene prioridad lo que se encuentre en Public.
        this.app.use(express.static('public'));
    }

    routes() {
        //Con este midleware le decimos que todo lo que entre por "/api/usuarios" o "api/auth", utilice la constante router de user.js donde hemos configuradao cada tipo de conexión y sus funciones
        this.app.use(this.path.auth, require('../routers/auth'));
        this.app.use(this.path.usuarios, require('../routers/user'));
        this.app.use(this.path.categorias, require('../routers/categorias'));
        this.app.use(this.path.producto, require('../routers/productos'));
        this.app.use(this.path.buscar, require('../routers/buscar'));
    }

    //este método no se ejecuta directamente del constructor, sino que es llamada desde la instancia creada de server en app.js
    listen() {
        this.app.listen(this.port, () => {
            console.log(`A la escucha en el puerto ${this.port}`.magenta);
        });
    }
}

module.exports = Server;
