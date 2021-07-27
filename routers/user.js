//Importamos el método Router de express
const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controllers/user');
const { esRoleValido, existeEmail, existeUsuarioPorId } = require('../helpers/db-validator');
const { validarCampos } = require('../middlewares/validar-campos');

//Si ejecutamos el método Router() nos devuelve un objeto router que
//es donde podemos configurar que acción realizar para cada petición.
const router = Router();

router.get('/', usuariosGet);

// con este "/:id" le decimos que nos envie en la request el valor que aparece en la petición put despúes de la / como una variable id. Este luego lo recuperaremos en el método UsuariosPut
router.put(
    '/:id',
    [
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        check('role').custom(esRoleValido),
        validarCampos,
    ],
    usuariosPut
);

//A la petición Post le pasamos como segundo argumento un midleware para hacer ciertas validaciones. (express-validator)
router.post(
    '/',
    [
        check('nombre', 'El nombre no puede estar vacío').not().isEmpty(),
        check('password', 'La contraseña tiene que tener más de 6 dígitos').isLength({ min: 6 }),
        check('correo', 'El email no es válido').isEmail(),
        //aquí se hace uso de validaciones personalizadas
        check('correo').custom(existeEmail),
        check('role').custom(esRoleValido),

        validarCampos,
    ],
    usuariosPost
);

router.delete(
    '/:id',
    [
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        validarCampos,
    ],
    usuariosDelete
);

module.exports = router;
