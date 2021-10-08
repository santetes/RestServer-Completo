const { request, response } = require('express');
const { ObjectId } = require('mongoose').Types; //Objeto de mongoose que nos permite comprobar si algo es una Id válida mongo

const { Usuario, Categoria, Producto } = require('../models');

const coleccionesPermitidas = ['usuarios', 'categorias', 'productos', 'roles'];

const buscarUsuario = async (termino = '', res = response) => {
    //Si como termino se pasa una id mongo de usuario la buscamos utilizando este método
    if (ObjectId.isValid(termino)) {
        const usuario = await Usuario.findById(termino);

        //Forma correcta de devolver resultados de una búsqueda. Se retorna un arreglo con los resultados o una vacío si no encuentra nada
        return res.status(200).json({
            results: usuario ? [usuario] : [],
        });
    }

    const regex = new RegExp(termino, 'i');

    //Busquedas en la base de datos mongo utilizando el operador Or (busca por nombre o por correo)
    //Se utiliza regExp para en este caso buscar cualquier coincidencia no teniendo en cuenta mayusculas y minusculas flag i
    const usuario = await Usuario.find({
        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{ estado: true }],
    });

    return res.json({
        results: usuario,
    });
};

///////////////////////////////////////////////////////////

const buscarCategoria = async (termino = '', res = response) => {
    if (ObjectId.isValid(termino)) {
        const categoria = await Categoria.findById(termino);

        return res.status(200).json({
            results: categoria ? [categoria] : [],
        });
    }

    const regex = new RegExp(termino, 'i');

    const categoria = await Categoria.find({
        nombre: regex,
        $and: [{ estado: true }],
    });

    return res.json({
        results: categoria,
    });
};

///////////////////////////////////////////////////////////////

const buscarProducto = async (termino = '', res = response) => {
    if (ObjectId.isValid(termino)) {
        const producto = await Producto.findById(termino);

        return res.status(200).json({
            results: producto ? [producto] : [],
        });
    }

    const regex = new RegExp(termino, 'i');

    const producto = await Producto.find({
        nombre: regex,
        $and: [{ estado: true }],
    });

    return res.json({
        results: producto,
    });
};

const buscar = async (req = request, res = response) => {
    const { coleccion, termino } = req.params;

    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son ${coleccionesPermitidas}`,
        });
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuario(termino, res);
            break;

        case 'categorias':
            buscarCategoria(termino, res);
            break;

        case 'productos':
            buscarProducto(termino, res);
            break;

        default:
            res.status(500).json({
                msg: 'Se le olvido configurar esta busqueda permitida',
            });
            break;
    }
};

module.exports = {
    buscar,
};
