const Roles = require('../models/roles');
const Usuario = require('../models/usuario');

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

module.exports = {
    esRoleValido,
    existeEmail,
    existeUsuarioPorId,
};
