var express = require('express');
var router = express.Router();
const {detalle,editar,crear,update,store, products, remove,gooCategory} = require('../controllers/productControllers');
const uploat = require("../middlewares/subirArchivos");
const productValidation = require('../validations/productValidation');
const adminCheck = require('../middlewares/adminCheck')

router
    .get('/detalle/:id', detalle)
    .get('/editarProducto/:id',adminCheck, editar)
    .put('/update/:id', update)
    .get('/crearProducto', crear)
    .post('/store',uploat.single("imageProduct"), store)
    
    .get("/", products)
    .get('/category/:id', gooCategory)
    .delete("/remove/:id", remove)

module.exports = router;
