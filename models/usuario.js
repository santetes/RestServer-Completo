//Este archivo se encarga de darle forma a nuestra base de datos. En la parte de Schema se defina como será el documento a almacenar en la BBDD. (el registro), y el modelo lo que define es la colección (la tabla)
const { Schema, model } = require('mongoose');

const usuariosSchema = Schema({
    nombre: {
        type: String,
        require: [true, 'el nombre es obligatorio'],
    },
    correo: {
        type: String,
        require: [true, 'el correo es obligatorio'],
        unique: true,
    },
    password: {
        type: String,
        require: [true, 'la contraseña es obligatoria'],
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        require: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE'],
    },
    estado: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false,
    },
});

//el nombre Usuario se va a utilizar para instanciar nuevos registros de usuario (documents) la colección se va a llamar como este mismo nombre puesto aquí pero añadiendo la terminación -s --> usuarios
module.exports = model('Usuario', usuariosSchema);
