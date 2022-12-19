var express = require('express');
var router = express.Router();
const {list, addItem, removeItem, removeAllItem} = require('../../controllers/apis/apiCartController')

/* GET home page. */
// /api/cart
router
     .get('/', list)
     .post('/', addItem)
     .delete('/:id', removeItem)
     .delete('/all', removeAllItem)
     


module.exports = router;