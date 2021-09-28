const { request, response, json } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-JWT');
const { googleVerify } = require('../helpers/google-verify');

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
    const { google_id_token } = req.body;

    try {
        const { nombre, img, correo } = await googleVerify(google_id_token);

        let usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            //Si no existe el usuario , tengo que crearlo
            const data = {
                nombre,
                correo,
                password: ':P',
                img,
                google: true,
            };

            usuario = new Usuario(data);

            await usuario.save();
        }
        if (!usuario.estado) {
            //Si el estado del usuario es false. Osea si se ha borrado de la bbdd
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado',
            });
        }

        //Generar JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token,
        });
    } catch (error) {
        res.json({
            ok: false,
            msg: 'El token no se pudo verificar',
        });
    }
};

module.exports = {
    login,
    googleSingIn,
};
