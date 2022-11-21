var express = require('express');
var router = express.Router();
const {detalle,editar,crear,update,store, products,gooCategory, destroy} = require('../controllers/productControllers');
const {uploat}= require("../middlewares/subirArchivos");
const productValidation = require('../validations/productValidation');

router
    .get('/detalle/:id', detalle)
    .get('/editarProducto/:id', editar)
    .put('/update/:id', uploat.array('imageProduct'), update)
    .get('/crearProducto', crear)
    .post('/store',uploat.array('imageProduct'), store)
    
    .get("/", products)
    .get('/category/:id', gooCategory)
    .delete("/remove/:id", destroy)

module.exports = router;
