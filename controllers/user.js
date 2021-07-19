const { response, request } = require('express');

const usuariosGet = (req = request, res = response) => {
    const { nombre, id } = req.query; //Capturamos los valoes que viene después d la petición Localhost:8080/api/usuariarios?nombre=xxx&id=xxxx
    res.json({
        msg: 'get API  - Desde Controlador',
        nombre,
        id,
    });
};

const usuariosPut = (req, res = response) => {
    const { id } = req.params; //Capturamos el valor id que viene despúes de / en la petición put
    res.json({
        msg: 'put API  - Desde Controlador',
        id,
    });
};

const usuariosPost = (req, res = response) => {
    const { nombre, edad } = req.body;
    res.json({
        msg: 'post API  - Desde Controlador',
        nombre,
        edad,
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
