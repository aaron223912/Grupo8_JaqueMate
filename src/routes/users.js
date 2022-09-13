var express = require('express');
var router = express.Router();
const {login, registro, storeUsersController, processLogin, profile, logout, updateUser} = require('../controllers/userControllers');
const uploatAvatar = require("../middlewares/subirAvatar");
const loginValidation = require('../validations/loginValidation');
const usersRegisterValidator = require('../validations/usersRegisterValidator');
const chequeadorSession = require("../middlewares/chequeadorSession")
/* GET users listing. */
router
    .get('/login', login)
    .post("/login",loginValidation ,processLogin)
    .get("/profile", chequeadorSession,profile)
    .get('/registro', registro)
    .post("/storeUsers",usersRegisterValidator, storeUsersController)
    .get("/logout",logout)
    .put("/updateUser/:id",uploatAvatar.single("avatar"), updateUser)


module.exports = router;
