const {check,body}=require("express-validator");
const {loadUsers} = require("../data/db_moduls");
const db = require('../database/models')

module.exports = [
    check("nombre")
        .notEmpty().withMessage("El nombre es obligatorio").bail()
        .isLength({
            min:2
        }).withMessage("minimo 2 caracteres").bail()
        .isAlpha().withMessage("Solo caracteres alfabeticos"),

    check("apellido")
        .notEmpty().withMessage("El apellido es obligatorio").bail()
        .isLength({
            min:2
        }).withMessage("minimo 2 caracteres").bail()
        .isAlpha().withMessage("Solo caracteres alfabeticos"),

    body("email")
        .notEmpty().withMessage("El email es obligatorio").bail()
        .isEmail().withMessage("Debe ser un email valido").bail()
        .custom((value, {req})=>{
           /* const user=loadUsers().find(user=> user.email === value);
            if (user) {
                return false
            } 
                return true  */
            
            db.User.findAll({
                where:{email: value}
            }
            )
            .then(user => {
                if (user) {
                    return false
                } 
                    return true
            })
            .cath(error => console.log(error))
            
        }).withMessage("Email ya se encuentra registrado"),

    check("password")
        .notEmpty().withMessage("La contraseña es obligatorio").bail()
        .isLength({
        min:6,
        max:12
        }).withMessage("La contraseña debe tener entre 6 y 12 caracteres"),
    
    body("password2")
        .notEmpty().withMessage("Debes confirmar la contraseña").bail()
        .custom((value,{req})=>{
            if (value!==req.body.password) {
                return false
            }
            return true
        }).withMessage("Las contraseñas deben coincidir").bail(),

    check("term")
        .isString("on").withMessage("Debes aceptar los terminos y condiciones")


        



]