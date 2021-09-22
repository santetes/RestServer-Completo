const { request, response } = require('express');

const esAdministrador = (req = request, res = response, next) => {
    if (!req.usuario) {
        return res.status(500).json({
            msg: 'se está realizando una operación no valida. Usuario borrado de la BBDD',
        });
    }

    const { nombre } = req.usuario;

    if (req.usuario.role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `el usuario ${nombre} no tiene los permisos necesários para realizar esta operación`,
        });
    }
    next();
};

const tieneRole = (...roles) => {
    return (req = request, res = response, next) => {
        if (!req.usuario) {
            return res.status(500).json({
                msg: 'se está realizando una operación no valida. Usuario borrado de la BBDD',
            });
        }

        if (!roles.includes(req.usuario.role)) {
            return res.status(401).json({
                msg: `Este servicio requierer uno de los siguientes roles: ${roles}`,
            });
        }
        next();
    };
};

module.exports = {
    esAdministrador,
    tieneRole,
};
