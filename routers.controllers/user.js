//El tipo de información puede ser:
// req.query = capturamos lo que viene despúes de la petición. ?nombre=xxx&id=xxxx
//req.params = capturamos lo que venga en la petición. En estos ejemplos indicamos que después de usuarios/ lo que venga lo tenemos definido como ID
//req.body = capturamos lo que venga en el cuerpo de la petición. En este caso un objeto JSON

//Estas consultas se pueden convinar entre si. Por ejemplo, en una petición PUT podemos indicarle mediante params el ID y además incluirle un body

const { response, request } = require('express');
//Importamos paquete encargado de realizar el encriptado del password
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { validarCampos } = require('../middlewares/validar-campos');

const usuariosGet = async (req = request, res = response) => {
    //capturamos desde la petición GET el limite y el desde. Por defecto se configura en 5 y 0 respectivametne. Casteamos los valores a Number porque en la query vienen en formato string
    const { limite = 5, desde = 0 } = req.query;
    //devuelvo una colección de usuarios desde "desde" hasta "limite" cuyo valor de la clave "estado" es igual a true
    const query = { estado: true };
    // const usuarios = await Usuario.find(query).limit(Number(limite)).skip(Number(desde));
    // //Cuento el número total de docuentos cuyo estado es true
    // const total = await Usuario.countDocuments(query);
    //Cuento los resultados mostrados

    //SE REFACTORIZA EL CÓDIGO PARA HACERLO MAS EFICIENTE EN CUANTO A TIEMPOS DE RESPUESTA
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query).limit(Number(limite)).skip(Number(desde)),
    ]);
    const parcial = usuarios.length;

    res.json({
        msg: `Mostrando ${parcial} de ${total}`,
        usuarios,
    });
};

const usuariosPut = async (req = request, res = response) => {
    const { id } = req.params; //Capturamos el valor id que viene despúes de / en la petición put
    const { _id, correo, password, google, ...resto } = req.body; //se saca esas variables si vienieran en el body para que no se pueda hackear bbdd

    if (password) {
        //Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true }); //New true se pone para que devuelva el usuario una vez actualizado

    res.json(usuario);
};

const usuariosPost = async (req, res = response) => {
    const { nombre, correo, password, role } = req.body;
    const usuario = new Usuario({ nombre, correo, password, role });

    //encriptar la constraseña--> todo esto es funcionamiento específico del paquete bcryptjs
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //guardar en BBDD
    await usuario.save();

    res.json(usuario);
};

const usuariosDelete = async (req = request, res = response) => {
    const { id } = req.params;

    //Si queremos borrarlo físicamente
    //const usuario = await Usuario.findByIdAndDelete(id);
    //La opción más adecuada es modificar su estado a false para que no sea listado pero siga manteniendose en la BBDD
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false }, { new: true });
    const usuarioAutentificado = req.usuario;

    res.json({
        usuario,
        usuarioAutentificado,
    });
};

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
};
