var express = require('express');
var router = express.Router();
const {detalle,editar,crear} = require('../controllers/productControllers');

router
    .get('/detalle', detalle)
    .get('/editarProducto', editar)
    .get('/crearProducto', crear)

module.exports = router;
