const { Router } = require('express');
const { check } = require('express-validator');
const { existeCategoria } = require('../helpers/db-validator');

const { validarToken, tieneRole } = require('../middlewares');
const { validarCampos } = require('../middlewares/validar-campos');

const {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria_individual,
    actualizarCategoria,
    borrarCategoria,
} = require('../routers.controllers/categorias');

const router = Router();

//get todos las categorias - public
router.get('/', obtenerCategorias);

//get categoria por Id - publico
// TODO crear middelware para comprobar si el id existe (existeCategoria)
router.get(
    '/:id',
    [
        check('id', 'La Id no es un identificador válido MongoDb').isMongoId(),
        check('id').custom(existeCategoria),
        validarCampos,
    ],

    obtenerCategoria_individual
);

//post crear una categoria - cualquier persona con token
router.post(
    '/',
    [
        validarToken,
        check('nombre', 'el nombre no puede estar vacío').not().isEmpty(),
        validarCampos,
    ],
    crearCategoria
);

//put modificar categoria por Id - cualquier persona con token
router.put(
    '/:id',
    [
        validarToken,
        check('nombre', 'el nombre no puede estar vacío').not().isEmpty(),
        check('id', 'La Id no es un identificador válido MongoDb').isMongoId(),
        check('id').custom(existeCategoria),
        validarCampos,
    ],
    actualizarCategoria
);

//delete categoria por Id - solo Admin
router.delete(
    '/:id',
    [
        validarToken,
        tieneRole('ADMIN_ROLE'),
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(existeCategoria),
        validarCampos,
    ],
    borrarCategoria
);

module.exports = router;
