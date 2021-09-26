const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-JWT');

const login = async (req = request, res = response) => {
    const { correo, password } = req.body;
    const usuario = await Usuario.findOne({ correo });
    //Verificar si el mail existe
    if (!usuario) {
        return res.status(400).json({
            msg: 'Usuario o password incorrectos - correo',
        });
    }
    //Verificar si el usuario existe
    if (!usuario.estado) {
        return res.status(400).json({
            msg: 'Usuario o password incorrectos - estado: false',
        });
    }
    //Verificación de la constraseña
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
        return res.status(400).json({
            msg: 'Usuario o password incorrectos - password',
        });
    }
    //Generar JWT
    const token = await generarJWT(usuario.id);
    console.log(token);

    res.json({
        usuario,
        token,
    });
};

const googleSingIn = async (req, res = response) => {
    const { id_token } = req.body;

    res.json({
        msg: 'todo Ok',
        id_token,
    });
};

module.exports = {
    login,
    googleSingIn,
};
