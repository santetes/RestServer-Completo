const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarToken = async (req = request, res = response, next) => {
    const tokenEntrada = req.header('x-token');
    if (!tokenEntrada)
        return res.status(401).json({
            msg: 'No se ha enviado token de autorización',
        });

    try {
        const { uid } = jwt.verify(tokenEntrada, process.env.SECRETORPRIVATEKEY);
        const usuario = await Usuario.findById(uid);

        //Comprueba si usuario existe en DB
        if (!usuario) {
            return res.status(401).json({
                msg: 'el token proporcionado no es válido Usuario no existe en DB',
            });
        }
        //Comprueba que el usuario que está intentando realizar la operación no se encuentra en estado False
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'el token proporcionado no es válido Estado: False',
            });
        }
        req.usuario = usuario;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'el token proporcionado no es válido',
        });
    }
};
module.exports = {
    validarToken,
};
