const {check,body}=require("express-validator");
const {loadUsers} = require("../data/db_moduls");
const bcryptjs = require("bcryptjs");
const db = require('../database/models')
module.exports = [
    

    check("email")
        .notEmpty().withMessage("El email es obligatorio").bail()
        .isEmail().withMessage("Debe ser un email valido"),
        

    body("password")
        .notEmpty().withMessage("La contraseña es obligatoria").bail()
        .custom((value, {req})=>{
            /*let user = loadUsers().find(user => user.email === req.body.email && bcryptjs.compareSync(value, user.password) );
            return user?true:false*/
            db.User.findAll({
                where:{email: req.body.email && bcryptjs.compareSync(value, user.password)}
            })
            .then(user)
            .cath(error => console.log(error))
        }).withMessage("Credenciales invalidas")
    


]
