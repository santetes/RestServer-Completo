const Server = require('./models/server');

//utilizo dotenv para poder registrar variables de entorno
require('dotenv').config();

//se crea una instancia de Server para iniciar y poner a la escucha el servidor
const server = new Server();
server.listen();
