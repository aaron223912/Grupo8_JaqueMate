const db = require("../database/models")
const {loadUsers,storeUsers} = require('../data/db_moduls');
const {validationResult, Result}= require("express-validator");
const bcriptjs = require("bcryptjs");
const provincias = require("../data/provincias");
const ciudades = require("../data/ciudades");
const fs = require("fs");
const path = require("path");
const { error } = require("console");
const { includes } = require("../data/provincias");

module.exports = {
    
    registro : (req, res) => {
        return res.render('registro')
    },
   storeUsersController : (req,res)=>{
        //return res.send(req.body)
        
        const errors = validationResult(req);
        //return res.send(errors)
        if (errors.isEmpty()) {

            let {nombre, apellido, email, password}= req.body;

            db.User.create(
                {name: nombre.trim(),
                surname: apellido.trim(),
                email,
                password: bcriptjs.hashSync(password.trim(),10),
                rolId : 3
            }
            )
            .then(user => {
                return res.redirect("/users/login")
            })
    
            .catch(error => console.log(error));
    
        

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

        db.User.findOne({
            where:{
                email: req.body.email,
            },
            include : [
                {
                    association: "rol"
                }
            ]
        }).then((user) => {
            req.session.userLogin = {
                id : user.id,
                nombre : user.name,
                categoria: user.rol.name,
                avatar : user.avatar
            }
    
            if(req.body.remember){
                res.cookie('jaquemate',req.session.userLogin,{
                    maxAge : 1000 * 120
                })
            }
    
            return res.redirect("/")
        }).catch(error => console.log(error))

      
    }else{
        return res.render("login",{
            errors:errors.mapped()
        })
    }
},

profile: (req,res)=>{
    // let user = loadUsers().find(user => user.id === req.session.userLogin.id);
    // return res.render("profile", {
    //     user,
    //     ciudades,
    //     provincias
    // })
    let user = db.User.findByPk(req.session.userLogin.id,{
        Include: [{
            association: 'genders'
        }]
    })
    .then((user) => {
        //return res.send(user)
        return res.render('profile',{
            user 
        })
    })
    .catch(error => console.log(error))
},


updateUser: (req,res)=>{
    // return res.send(req.body)
    /*console.log(req.file);
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
    return res.redirect("/users/profile")
    */

    const {nombre,apellido,fechaNacimiento,pasatiempo,about} = req.body

    db.User.update({
      name: nombre.trim(),
      surname: apellido.trim(),
      brithday: fechaNacimiento,
      hobbies: pasatiempo,
      about: about,
      avatar: req.file ? req.file.filename : req.session.userLogin.avatar
    },{
        where: {id: req.session.userLogin.id}
    })
    .then(user =>{
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
         console.log(user);
        return res.send(user)
    })
    .catch(error => console.log(error))
},
logout: (req,res)=>{
    req.session.destroy()
    res.cookie('jaquemate', null, {
        maxAge : -1 
    })
    return res.redirect("/users/profile/" + userLogin.id)

}






}