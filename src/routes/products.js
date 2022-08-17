var express = require('express');
var router = express.Router();
const {detalle,editar,crear,store} = require('../controllers/productControllers');

router
    .get('/detalle', detalle)
    .get('/editarProducto', editar)
    .get('/crearProducto', crear)
    .post('/crearProducto', store)

module.exports = router;
