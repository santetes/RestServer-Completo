const validaCampos = require('../middlewares/validar-campos');
const validaRoles = require('../middlewares/validar-role');
const validarToken = require('../middlewares/validar-Token');
const validarCategoria = require('../middlewares/validar-categoria');

module.exports = {
    ...validaRoles,
    ...validarToken,
    ...validaCampos,
    ...validarCategoria,
};
