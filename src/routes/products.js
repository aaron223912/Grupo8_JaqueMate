var express = require('express');
var router = express.Router();
const {detalle} = require('../controllers/productControllers');

router
    .get('/detalle', detalle)

module.exports = router;
