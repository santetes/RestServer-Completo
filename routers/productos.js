const { Router } = require('express');
const { check } = require('express-validator');
const { existeProducto, esCategoriaValida } = require('../helpers/db-validator');

const { validarToken, tieneRole, validarCategoria } = require('../middlewares');
const { validarCampos } = require('../middlewares/validar-campos');

const {
    crearProducto,
    obtenerProductos,
    obtenerProducto_individual,
    actualizarProducto,
    borrarProducto,
} = require('../routers.controllers/productos');

const router = Router();

//Todos los productos
router.get('/', obtenerProductos);

//Obtener producto en concreto
router.get(
    '/:id',
    [
        check('id', 'La Id no es un identificador válido MongoDb').isMongoId(),
        check('id').custom(existeProducto),
        validarCampos,
    ],

    obtenerProducto_individual
);

//Crear Producto

router.post(
    '/',
    [
        validarToken,
        check('nombre', 'el nombre no puede estar vacío').not().isEmpty(),
        check('categoria', 'la categoria no puede esta vacía').not().isEmpty(),
        check(
            'categoria',
            'La Id  de la categoria no es un identificador válido MongoDb'
        ).isMongoId(),
        check('categoria').custom(esCategoriaValida),
        validarCampos,
    ],
    crearProducto
);

//Modificar Producto
router.put(
    '/:id',
    [
        validarToken,
        check('id', 'La Id no es un identificador válido MongoDb').isMongoId(),
        check('categoria', 'La categoria no es un Id válido MongoDb').isMongoId(),
        check('id').custom(existeProducto),
        check('categoria').custom(esCategoriaValida),
        validarCampos,
    ],
    actualizarProducto
);

//Eliminar Producto
router.delete(
    '/:id',
    [
        validarToken,
        tieneRole('ADMIN_ROLE'),
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(existeProducto),
        validarCampos,
    ],
    borrarProducto
);

module.exports = router;
