const {check,body}=require("express-validator");


module.exports = [
    check("nombre")
    .notEmpty().withMessage("El nombre es obligatorio, no puedes dejar el campo vacio").bail()
        .isLength({
            min:2
        }).withMessage("minimo 2 caracteres").bail()
        .isAlpha().withMessage("Solo caracteres alfabeticos"),

    check("apellido")
        .notEmpty().withMessage("El apellido es obligatorio, no puedes dejar el campo vacio").bail()
        .isLength({
            min:2
        }).withMessage("minimo 2 caracteres").bail()
        .isAlpha().withMessage("Solo caracteres alfabeticos"),
]