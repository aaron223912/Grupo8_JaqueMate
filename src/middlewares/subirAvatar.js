const multer = require("multer");

const path = require("path");

const storageUsers = multer.diskStorage({
    destination : (req, file, cb)=>{
        cb(null, "./public/images/users")
    },
    filename:(req, file, cb)=>{
        cb(null,'avatar' + Date.now() + path.extname(file.originalname))

    }
})

const uploatAvatar = multer({
    storage : storageUsers
    // limits: {fileSize: 3145728},
    // fileFilter: (req,file,cb)=>{
    //     let type = file.mimetype.startsWith("image/PNG","image/JPG","image/JPEG","image/GIF","image/TIF");
    //     type?cb(null, true):cb(new Error ("No es un archivo de tipo imagen"))
    // }

});
module.exports = uploatAvatar