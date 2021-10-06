const { request, response } = require('express');
const Categoria = require('../models/categoria');
const Producto = require('../models/producto');

//Obtener productos - paginado - total - populate
const obtenerProductos = async (req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query;

    const consulta = { estado: true };

    const [total, productos] = await Promise.all([
        Producto.countDocuments(consulta),
        Producto.find(consulta)
            .limit(Number(limite))
            .skip(Number(desde))
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre'),
    ]);

    const parcial = productos.length;

    res.json({
        msg: `Mostrando ${parcial} de ${total}`,
        productos,
    });
};

//Obtener producto - populate
const obtenerProducto_individual = async (req = request, res = response) => {
    const { id } = req.params;
    const producto = await Producto.findById(id)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre');

    if (!producto.estado)
        return res.status(401).json({
            msg: 'Producto borrado de la BBDD, contacte con el administrador',
        });

    res.status(200).json({
        producto,
    });
};

//Crear producto

//TODO: modificar categoria nombre por categoria Id para almacenar en la base de datos

const crearProducto = async (req = request, res = response) => {
    const { nombre, precio, descripcion, disponible } = req.body;
    const usuario = req.usuario.id;
    const categoria = req.categoria.id;

    let producto = await Producto.findOne({ nombre });
    if (producto) {
        return res.status(400).json({
            msg: 'Este producto ya se encuentra almacenado en la base de datos',
        });
    }

    producto = new Producto({ nombre, precio, categoria, usuario, descripcion, disponible });
    await producto.save();

    res.status(201).json({
        msg: 'Producto creado correctamente',
        producto,
    });
};

//Actualizar producto
const actualizarProducto = async (req = request, res = response) => {
    const { id } = req.params;
    const { estado, usuario, categoria, ...data } = req.body; //extraigo todo lo que viene del body. si viniera usuario, tambien lo saco para poder luego actualizar el usuario que realiza la operación
    data.usuario = req.usuario._id;
    data.categoria = req.categoria.id;

    const producto = await Producto.findByIdAndUpdate(id, data, { new: true })
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre');

    if (!producto.estado)
        res.status(401).json({
            msg: 'Esta intentando modificar un producto que se encuentra borrado de la BBDD. Contacte con el administrador',
        });

    res.status(201).json({
        producto,
    });
};

//Borrar producto - estado:false
const borrarProducto = async (req = request, res = response) => {
    const { id } = req.params;

    let producto = await Producto.findByIdAndUpdate(
        id,
        { estado: false, usuario: req.usuario._id }, //Para registrar el usuario que ha realizado la operación
        { new: true }
    )
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre');

    res.status(200).json({
        msg: 'El producto ha sido borrado con éxito',
        producto,
    });
};

module.exports = {
    obtenerProductos,
    obtenerProducto_individual,
    crearProducto,
    actualizarProducto,
    borrarProducto,
};
