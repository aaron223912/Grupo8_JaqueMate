var express = require('express');
var router = express.Router();
const {login, registro, storeUsers} = require('../controllers/userControllers');
const uploatAvatar = require("../middlewares/subirAvatar");

/* GET users listing. */
router
    .get('/login', login)
    .get('/registro', registro)
    .post("/storeUsers",uploatAvatar.single("avatar"), storeUsers)



module.exports = router;
