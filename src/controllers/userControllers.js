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
        /*
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
        }*/

        

        let {nombre, apellido, email, password}= req.body;

        db.User.create(
            {nombre: nombre.trim(),
            apellido: apellido.trim(),
            email,
            password: bcriptjs.hashSync(password.trim(),10)
        }
        )
        .then(user => {
            return res.redirect("/users/login")
        })

        .catch(error => console.log(error));

   },

   login : (req, res) => {
    return res.render('login')
},

processLogin: (req,res) => {
    /*let errors = validationResult(req)
    //return res.send(errors)
    if(errors.isEmpty()){

        let {id, nombre, categoria, avatar} = loadUsers().find(user => user.email === req.body.email);

        req.session.userLogin = {
            id,
            nombre,
            categoria,
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
    }*/

    db.User.findOne({
        where:{
            email: req.body.email,
        },
        Imclude : [
            {
                association: "rol"
            }
        ]
    })
    .then(user => {
        if(!user){
            return res.redirect("/users/login")
        }else{
            if (bcryptjs.compareSync(req.body.password, user.password)) {
                req.session.userLogin = {
                    id: user.id,
                    nombre: user.name,
                    categoria: user.rol,
                    //avatar
                }
        
                if(req.body.remember){
                    res.cookie('jaquemate',req.session.userLogin,{
                        maxAge : 1000 * 120
                    })
                }
        
                return res.redirect("/")
            }else{
                return res.redirect("/users/login")
            }
        }})
    .catch(error => {console.log(error)})
    
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
   /* let genders = db.Gender.findAll(
        {Include : [{
            attributes: ['id', 'name']
        }]}
    )*/

    Promise.all([user])
    .then((user) => {
        res.render('profile',{
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
      about: about
    },{
        where: {id: req.session.userLogin.id}
    })
    .then(result =>{
        console.log(result);
    })
    .catch(error => console.log(error))
},
logout: (req,res)=>{
    req.session.destroy()
    res.cookie('jaquemate', null, {
        maxAge : -1 
    })
    return res.redirect("/")

}






}