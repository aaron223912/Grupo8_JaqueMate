const multer = require("multer");

const path = require("path");
const { store } = require("../controllers/productControllers");

const storage = multer.diskStorage({
    destination : (req, file, cb)=>{
        cb(null, "./public/images/products")
    },
    filename : (req, file, cb) =>{
        cb(null, "producto"+ '-' + Date.now() + path.extname(file.originalname))

    }
})
const uploat = multer({
    storage:storage}
)
module.exports={uploat}


