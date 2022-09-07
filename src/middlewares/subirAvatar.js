const multer = require("multer");

const path = require("path");

const storageUsers = multer.diskStorage({
    destination : (req, file, cb)=>{
        cb(null, "./public/images/users")
    },
    filename : (req, file, cb) =>{
        cb(null, file.fieldname + 'avatar' + Date.now() + path.extname(file.originalname))

    }
})

const uploatAvatar= multer({
    storageUsers:storageUsers
})
module.exports = uploatAvatar;