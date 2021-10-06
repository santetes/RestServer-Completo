const { request, response } = require('express');
const Categoria = require('../models/categoria');

//Obtener categorias - paginado - total - populate
const obtenerCategorias = async (req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query;

    const consulta = { estado: true };

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(consulta),
        Categoria.find(consulta)
            .limit(Number(limite))
            .skip(Number(desde))
            .populate('usuario', 'nombre'),
    ]);

    const parcial = categorias.length;

    res.json({
        msg: `Mostrando ${parcial} de ${total}`,
        categorias,
    });
};

//Obtener categoria - populate
const obtenerCategoria_individual = async (req = request, res = response) => {
    const { id } = req.params;
    const categoria = await Categoria.findById(id).populate('usuario', 'nombre');

    if (!categoria.estado)
        res.status(401).json({
            msg: 'Categoria borrada de la BBDD, contacte con el administrador',
        });

    res.status(200).json({
        categoria,
    });
};

//Crear categoria
const crearCategoria = async (req = request, res = response) => {
    const nombre = req.body.nombre.toUpperCase();
    const usuario = req.usuario.id;

    let categoria = await Categoria.findOne({ nombre });
    if (categoria)
        return res.status(400).json({
            msg: 'Esta categoria ya se encuentra almacenada en la base de datos',
        });

    categoria = new Categoria({ nombre, usuario });
    await categoria.save();

    res.status(201).json({
        msg: 'Categoria creada correctamente',
        categoria,
    });
};

//Actualizar categoria
const actualizarCategoria = async (req = request, res = response) => {
    const { id } = req.params;
    const { estado, usuario, nombre, ...data } = req.body; //extraigo todo lo que viene del body. si viniera usuario, tambien lo saco para poder luego actulaizar el usuario que realiza la operación
    data.nombre = nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true }).populate(
        'usuario',
        'nombre'
    );

    if (!categoria.estado)
        res.status(401).json({
            msg: 'Esta intentando modificar una categoria que se encuentra borrada de la BBDD. Contacte con el administrador',
        });

    res.status(201).json({
        categoria,
    });
};

//Borrar categoria - estado:false
const borrarCategoria = async (req = request, res = response) => {
    const { id } = req.params;

    let categoria = await Categoria.findByIdAndUpdate(
        id,
        { estado: false, usuario: req.usuario._id }, //Para registrar el usuario que ha realizado la operación
        { new: true }
    ).populate('usuario', 'nombre');

    res.status(200).json({
        msg: 'La categoria ha sido borrada con éxito',
        categoria,
    });
};

module.exports = {
    obtenerCategorias,
    obtenerCategoria_individual,
    crearCategoria,
    actualizarCategoria,
    borrarCategoria,
};
