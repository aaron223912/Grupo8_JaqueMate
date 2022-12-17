var express = require('express');
var router = express.Router();
const {index, search, carrito} = require('../controllers/indexControllers')

/* GET home page. */
router
     .get('/', index)
     .get('/search', search)
     .get('/carrito', carrito)
     


module.exports = router;
