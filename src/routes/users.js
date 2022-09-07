var express = require('express');
var router = express.Router();
const {login, registro, storeUsersController} = require('../controllers/userControllers');
const uploatAvatar = require("../middlewares/subirAvatar");
const usersRegisterValidator = require('../validations/usersRegisterValidator');

/* GET users listing. */
router
    .get('/login', login)
    .get('/registro', registro)
    .post("/storeUsers",uploatAvatar.single("avatar"),usersRegisterValidator, storeUsersController)



module.exports = router;
