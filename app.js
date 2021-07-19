const Server = require('./models/server');

//utilizo dotenv para poder registrar variables de entorno
require('dotenv').config();

const server = new Server();
server.listen();
