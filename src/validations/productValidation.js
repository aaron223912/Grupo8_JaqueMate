const {check,body}=require("express-validator");

module.exports = [
    check("nameProduct")
        .notEmpty().withMessage("El nombre del producto es obligatorio").bail()
        .isLength({
            min:4
        }).withMessage("minimo 4 caracteres").bail()
        .isAlpha().withMessage("Solo caracteres alfabeticos"),

    check("description")
        .notEmpty().withMessage("Ingresa una descripcion").bail()
        .isLength({
            min:6
        }).withMessage("minimo 6 caracteres").bail(),


    check("price")
        .notEmpty().withMessage("Ingresa un precio acorde al producto").bail()
        .isNumeric().withMessage("solo numeros"),

     check("imageProduct")
        .notEmpty().withMessage("Selecciona una imagen").bail(),

]