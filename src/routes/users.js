var express = require('express');
var router = express.Router();
const {login, registro, storeUsersController, processLogin, profile, logout, updateUser} = require('../controllers/userControllers');
const uploatAvatar = require("../middlewares/subirAvatar");
const loginValidation = require('../validations/loginValidation');
const usersRegisterValidator = require('../validations/usersRegisterValidator');
const chequeadorSession = require("../middlewares/chequeadorSession")
const checkInicioSession = require('../middlewares/checkInicionSession')
/* GET users listing. */
router
    .get('/login', checkInicioSession, login)
    .post("/login",loginValidation, processLogin)
    .get("/profile/:id", chequeadorSession,profile)
    .get('/registro', checkInicioSession, registro)
    .post("/storeUsers",usersRegisterValidator, storeUsersController)
    .get("/logout",logout)
    .put("/updateUser/:id",uploatAvatar.single("avatar"), updateUser)


module.exports = router;
