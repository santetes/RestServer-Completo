const mongoose = require('mongoose');
require('colors');

const dbConexion = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        console.log('Base de datos Conectada'.bgYellow.black);
    } catch (error) {
        throw 'error en la conexión con la base de datos';
    }
};

module.exports = {
    dbConexion,
};
