const validaCampos = require('../middlewares/validar-campos');
const validaRoles = require('../middlewares/validar-role');
const validarToken = require('../middlewares/validar-Token');

module.exports = {
    ...validaRoles,
    ...validarToken,
    ...validaCampos,
};
