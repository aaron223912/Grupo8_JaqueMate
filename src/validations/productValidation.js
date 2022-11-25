const {check,body}=require("express-validator");

module.exports = [
    check("name")
        .notEmpty().withMessage("El nombre del producto es obligatorio").bail()
        .isLength({
            min:4
        }).withMessage("minimo 4 caracteres").bail()
        .isAlpha().withMessage("Solo caracteres alfabeticos"),

    check("description")
        .notEmpty().withMessage("Ingresa una descripcion").bail()
        .isLength({
            min:10
        }).withMessage("minimo 10 caracteres").bail(),


    check("price")
        .notEmpty().withMessage("Ingresa un precio acorde al producto").bail()
        .isNumeric().withMessage("solo numeros"),
        
     check("imageProduct")
        .notEmpty().withMessage("Selecciona una imagen").bail(),

]