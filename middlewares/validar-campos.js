//Este es el paquete encargado de comprobar si el midleware de express-validator devuelve algún error de comprobación enviado desde alguna petición
const { validationResult } = require('express-validator');

const validarCampos = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    next();
};

module.exports = {
    validarCampos,
};
