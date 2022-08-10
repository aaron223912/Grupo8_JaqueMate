var express = require('express');
var router = express.Router();
const {index, carrito} = require('../controllers/indexControllers')

/* GET home page. */
router
     .get('/', index)
     .get('/carrito', carrito)


module.exports = router;
