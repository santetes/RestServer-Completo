//El tipo de información puede ser:
// req.query = capturamos lo que viene despúes de la petición. ?nombre=xxx&id=xxxx
//req.params = capturamos lo que venga en la petición. En estos ejemplos indicamos que después de usuarios/ lo que venga lo tenemos definido como ID
//req.body = capturamos lo que venga en el cuerpo de la petición. En este caso un objeto JSON

//Estas consultas se pueden convinar entre si. Por ejemplo, en una petición PUT podemos indicarle mediante params el ID y además incluirle un body

const { response, request } = require('express');
const Usuario = require('../models/usuario');

const usuariosGet = (req = request, res = response) => {
    const { nombre, id } = req.query; //Capturamos los valoes que viene después d la petición Localhost:8080/api/usuariarios?nombre=xxx&id=xxxx
    res.json({
        msg: 'get API  - Desde Controlador',
        nombre,
        id,
    });
};

const usuariosPut = (req = request, res = response) => {
    const { id } = req.params; //Capturamos el valor id que viene despúes de / en la petición put

    res.json({
        msg: 'put API  - Desde Controlador',
        id,
    });
};

const usuariosPost = async (req, res = response) => {
    const body = req.body;
    const usuario = new Usuario(body);

    await usuario.save();

    res.json({
        msg: 'post API  - Desde Controlador',
        usuario,
    });
};

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API  - Desde Controlador',
    });
};

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
};
