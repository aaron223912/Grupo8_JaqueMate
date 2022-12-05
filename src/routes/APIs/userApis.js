var express = require('express');
var router = express.Router();
const {verifyEmail} = require("../../controllers/apis/userApis")


router
    .post('/verify-email',verifyEmail)


module.exports = router;
