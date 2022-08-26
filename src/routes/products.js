var express = require('express');
var router = express.Router();
const {detalle,editar,crear,update,store} = require('../controllers/productControllers');

router
    .get('/detalle/:id', detalle)
    .get('/editarProducto/:id', editar)
    .put('/update/:id', update)
    .get('/crearProducto', crear)
    .post('/crearProducto', store)

module.exports = router;
