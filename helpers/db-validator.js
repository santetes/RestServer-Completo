const Categoria = require('../models/categoria');
const Roles = require('../models/roles');
const Usuario = require('../models/usuario');
const Producto = require('../models/producto');

const esRoleValido = async (role = '') => {
    const existeRole = await Roles.findOne({ role });
    if (!existeRole) {
        throw new Error(` El rol ${role} no se encuentra registrado en nuestra base de datos`);
    }
};

const existeEmail = async (correo = '') => {
    const existe = await Usuario.findOne({ correo });
    if (existe) {
        throw new Error('Este Mail ya se encuentra en la base de datos');
    }
};

const existeUsuarioPorId = async (id) => {
    const existe = await Usuario.findById(id);
    if (!existe) {
        throw new Error(`No se ha encontrado ningún usuario con el id ${id}`);
    }
};

const existeCategoria = async (id = '') => {
    const existe = await Categoria.findById(id);
    if (!existe) {
        throw new Error('No existe una categoria con la id indicada');
    }
};

const existeProducto = async (id = '') => {
    const existe = await Producto.findById(id);
    if (!existe) {
        throw new Error('No existe un producto con la Id indicada');
    }
};

const esCategoriaValida = async (id = '') => {
    const existe = await Categoria.findById(id);
    if (!existe) {
        throw new Error('No existe un producto con la Id indicada');
    }
};

module.exports = {
    esRoleValido,
    existeEmail,
    existeUsuarioPorId,
    existeCategoria,
    existeProducto,
    esCategoriaValida,
};
