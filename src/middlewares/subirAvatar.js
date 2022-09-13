const multer = require("multer");

const path = require("path");

const storageUsers = multer.diskStorage({
    destination : (req, file, cb)=>{
        cb(null, "./public/images/users")
    },
    filename : (req, file, cb) =>{
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
       // cb(null, "avatar" + Date.now()

    }
})

const uploatAvatar= multer({
    storageUsers
})
module.exports = uploatAvatar