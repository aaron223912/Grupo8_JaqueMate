const {loadUsers,storeUsers} = require('../data/db_moduls');
const {validationResult}= require("express-validator");
const bcriptjs = require("bcryptjs")

module.exports = {
    
    registro : (req, res) => {
        return res.render('registro')
    },
   storeUsersController : (req,res)=>{
        //return res.send(req.body)
        
        const errors = validationResult(req);
        //return res.send(errors)
        if (errors.isEmpty()) {
            
            const {id,nombre,apellido,email,password,avatar}=req.body;
        let users =loadUsers();

        const newUsers = {
            id: users[users.length -1] ? users[users.length -1].id +1: 1,
            nombre: nombre.trim(),
            apellido:apellido.trim(),
            email:email.trim(),
            password: bcriptjs.hashSync(password.trim(),10),
            categoria:null,
            avatar:null,
            genero: null,
            ciudad:null,
            provincia:null,
            fechaNacimiento:null,
            pasatiempo:null,
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

   },

   login : (req, res) => {
    return res.render('login')
},

processLogin: (req,res) => {
    let errors = validationResult(req)
    //return res.send(errors)
    if(errors.isEmpty()){

        let {id, nombre, categoria, avatar} = loadUsers().find(user => user.email === req.body.email);

        req.session.userLogin = {
            id,
            nombre,
            categoria,
            avatar
        }

        return res.redirect("/")
    }else{
        return res.render("login",{
            errors:errors.mapped()
        })
    }
    
},

profile: (req,res)=>{
    let user = loadUsers().find(user => user.id === req.session.userLogin.id);
    return res.render("profile", {
        user
    })
},

logout: (req,res)=>{
    req.session.destroy()
    return res.redirect("/")
},
updateUser: (req,res)=>{

    return res.redirect("/")
},
}