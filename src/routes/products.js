var express = require('express');
var router = express.Router();
const {detalle,editar,crear,update,store, products, remove} = require('../controllers/productControllers');
const uploat = require("../middlewares/subirArchivos")
const adminCheck = require('../middlewares/adminCheck')

router
    .get('/detalle/:id', detalle)
    .get('/editarProducto/:id',adminCheck, editar)
    .put('/update/:id', update)
    .get('/crearProducto',adminCheck, crear)
    .post('/store',uploat.single("imagen"), store)
    .get("/", products)
    .delete("/remove/:id", remove)

module.exports = router;
