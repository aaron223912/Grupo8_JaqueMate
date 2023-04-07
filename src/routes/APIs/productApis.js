var express = require('express');
var router = express.Router();
const { list, detail, update, store, destroy } = require("../../controllers/apis/apisProduct")
const {uploat}= require("../../middlewares/subirArchivos");


router
    .get('/list',list)
    .get('/detail/:id', detail)
    .put('/editar/:id', update)
    .post('/add', store)
    .delete('/delete/:id', destroy)


module.exports = router;
