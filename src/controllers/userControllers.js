const {loadUsers,storeUsers} = require('../data/db_moduls');
const {validationResult}= require("express-validator");
const bcriptjs = require("bcryptjs");
const provincias = require("../data/provincias");
const ciudades = require("../data/ciudades");
const fs = require("fs");
const path = require("path");
const { promiseImpl } = require('ejs');
const db = require('../database/models');

module.exports = {
    
    registro : (req, res) => {
        return res.render('registro')
    },
   storeUsersController : (req,res)=>{
    /*
        const errors = validationResult(req);
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
        }*/
        let gender = db.Gender.findAll();

        let rol = db.Rol.findAll();

        let userStore = db.User.create({
            name: nombre.trim(),
            surname: apellido.trim(),
            password: bcriptjs.hashSync(password.trim(),10),
            email,
            birthday,
            genderId,
            rolId
        })

        Promise.all([gender, rol, userStore])
         .then(([gender, rol, userStore]) => {
            return res.redirect("/users/login", {
                gender,
                rol
            })
         })
         .catch(error => console.log(error))


   },

   login : (req, res) => {
    return res.render('login')
},

processLogin: (req,res) => {
   /* let errors = validationResult(req)
    if(errors.isEmpty()){

        let {id, nombre, rol, avatar} = loadUsers().find(user => user.email === req.body.email);

        req.session.userLogin = {
            id,
            nombre,
            rol,
            avatar
        }

        if(req.body.remember){
            res.cookie('jaquemate',req.session.userLogin,{
                maxAge : 1000 * 120
            })
        }

        return res.redirect("/")
    }else{
        return res.render("login",{
            errors:errors.mapped()
        })
    }
    */

    db.User.findAll({
        where: {email: req.body.email}
    })
    .then(user => {
        req.session.userLogin = {
            id,
            nombre,
            rol 
        }

        if(req.body.remember){
            res.cookie('jaquemate',req.session.userLogin,{
                maxAge : 1000 * 120
            })
        }

        return res.redirect("/")
    })
    .catch(error => console.log(error))
    
},

profile: (req,res)=>{
   /* let user = loadUsers().find(user => user.id === req.session.userLogin.id);
    return res.render("profile", {
        user,
        ciudades,
        provincias
    })
    */

    db.User.findByPk(req.params.id === req.session.userLogin.id)
    .then((user) => {
        res.render('profile',{user})
    })
},


updateUser: (req,res)=>{

    // return res.send(req.body)
   /* console.log(req.file);
    console.log(req.body);

    const {nombre,apellido,ciudad,provincia,fechaNacimiento,pasatiempo,about} = req.body

    let usersModify = loadUsers().map(user =>{
        if (user.id === +req.params.id) {
            return{
                ...user,
                ...req.body,
                avatar: req.file ? req.file.filename : req.session.userLogin.avatar
            }
        }
        return user
    });
    if(req.file && req.session.userLogin.avatar){
        if(fs.existsSync(path.resolve(__dirname,"..","public","images","users",req.session.userLogin.avatar))){

            fs.unlinkSync(path.resolve(__dirname,"..","public","images","users",req.session.userLogin.avatar))
        }

    }
    
    req.session.userLogin = {
        ...req.session.userLogin,
        nombre,
        avatar: req.file ? req.file.filename : req.session.userLogin.avatar
    }

    storeUsers(usersModify);
    return res.redirect("/users/profile")*/

    db.User.update({
        name: nombre.trim(),
        surname: apellido.trim(),
        email,
        birthday,
        genderId,
        rolId
    },
    {
        where: {id: req.params.id}
    })
    then((response, user) => {
        console.log(response);
        req.session.userLogin = {
            ...req.session.userLogin,
            nombre
        }
        res.redirect('users/profle',{
            user
        })
    })


},
logout: (req,res)=>{
    req.session.destroy()
    res.cookie('jaquemate', null, {
        maxAge : -1 
    })
    return res.redirect("/")

}
}