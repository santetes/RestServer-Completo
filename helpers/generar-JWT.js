const jwt = require('jsonwebtoken');
const generarJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid }; //objeto a codificar. En este caso solo uid:uid

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, { expiresIn: '4h' }, (err, token) => {
            if (err) {
                console.log('No se pudo generar el JWT');
                reject('No se pudo generar JWT');
            } else {
                resolve(token);
            }
        });
    });
};

module.exports = {
    generarJWT,
};
