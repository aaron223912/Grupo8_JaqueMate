var express = require('express');
var router = express.Router();
const {detail,crear,edit} = require("../controllers/productControllers")

router
.get('/detail', detail)
.get('/crear', crear)
.get('/edit', edit)

module.exports = router;