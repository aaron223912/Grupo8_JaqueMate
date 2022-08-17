var express = require('express');
var router = express.Router();
const {login, registro} = require('../controllers/userControllers')

/* GET users listing. */
router
    .get('/login', login)
    .get('/registro', registro)



module.exports = router;
