const {loadUsers,storeUsers} = require('../data/db_moduls');
const {validationResult}= require("express-validator")

module.exports = {
    login : (req, res) => {
        return res.render('login')
    },
    registro : (req, res) => {
        return res.render('registro')
    },
   storeUsersController : (req,res)=>{
        //return res.send(req.body)
        
        const errors = validationResult(req);
        //return res.send(errors)
        if (errors.isEmpty()) {
            
            const {id,nombre,apellido,email,contraseña,categoria,avatar}=req.body;
        let users =loadUsers();

        const newUsers = {
            id: users[users.length -1] ? users[users.length -1].id +1: 1,
            nombre: nombre.trim(),
            apellido:apellido.trim(),
            email:null,
            password,
            categoria:null,
            avatar:req.file.filename,
            genero: null,
            ciudad:null,
            provincia:null,
            about:null
        }

        usersModify = [...users,newUsers];
        storeUsers(usersModify);
        return res.redirect("/users/login")

        }else{
            return res.render("registro",{
                errors:errors.mapped(),
                old: req.body
            })
        }

   }

}