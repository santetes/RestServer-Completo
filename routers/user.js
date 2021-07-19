//Importamos el método Router de express
const { Router } = require('express');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controllers/user');

//Si ejecutamos el método Router() nos devuelve un objeto router que
//es donde podemos configurar que acción realizar para cada petición.
const router = Router();

router.get('/', usuariosGet);

router.put('/:id', usuariosPut); // con este "/:id" le decimos que nos envie en la request el valor que aparece en la petición put despúes de la / como una variable id. Este luego lo recuperaremos en el método UsuariosPut

router.post('/', usuariosPost);

router.delete('/', usuariosDelete);

module.exports = router;
