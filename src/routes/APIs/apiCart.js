var express = require('express');
var router = express.Router();
const {list, addItem, removeItem} = require('../../controllers/apis/apiCartController')

/* GET home page. */
// /api/cart
router
     .get('/', list)
     .post('/', addItem)
     .delete('/:id', removeItem)
     


module.exports = router;