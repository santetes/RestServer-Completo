const { Router } = require('express');
const router = Router();

const { buscar } = require('../routers.controllers/buscar');

router.get('/:coleccion/:termino', buscar);

module.exports = router;
