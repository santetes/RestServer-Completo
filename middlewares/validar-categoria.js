const { request, response } = require('express');
const Categoria = require('../models/categoria');

const validarCategoria = async (req = request, res = response, next) => {
    const nombre = req.body.categoria.toUpperCase();
    const categoria = await Categoria.findOne({ nombre });

    if (!categoria) {
        return res.status(401).json({
            msg: `No existe la categoria ${nombre}`,
        });
    }
    if (!categoria.estado) {
        return res.status(401).json({
            msg: `Está intentando realizar una operación no válida, Categoria se encuentra eliminada de la BBDD`,
        });
    }

    req.categoria = categoria;
    next();
};

module.exports = {
    validarCategoria,
};
