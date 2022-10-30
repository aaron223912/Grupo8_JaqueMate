const db= require("../database/models")
const {loadProducts,loadCategories,storeProduct} = require('../data/db_moduls');
const { fileLoader } = require("ejs");
const { body } = require("express-validator");


module.exports = {
    detalle : (req, res) => {
        // const products = loadProducts();
        // const product = products.find(product => product.id === +req.params.id);
        
        // return res.render('detalleDeProducto',{
        //     product
        // })
        db.Product.findByPk(req.params.id,{
            // include:[{
            //     all:true
            // }]
            
                include:[
    
                    {
                        association:"category"
                    },
                    {association:"images"}
                ]
            
        })
        .then(product =>{
            // return res.send(product)
            return res.render("detalleDeProducto",{
                product
            })
        })
        .catch(error => console.log(error))

    },
    editar : (req, res) => {


        db.Category.findAll({
            order : ["name"]
        })
        
        .then(categories=>{
           // return res.send(req.body)
            return res.render("editarProducto",{
                categories
            })
        })
        .catch(error => console.log(error))

        // const products = loadProducts();
        // const categories = loadCategories();

        // const product = products.find(product => product.id === +req.params.id);


        // return res.render('editarProducto', {
        //     product,
        //     categories
        // })
        
    },
    update : (req, res) => {

        db.Product.update(
            {
                ...req.body,
                title:req.body.title.trim()
            },
            {
                where : {id:req.params.id}
            }
        )
        .then(response => {
            console.log(response);
            return res.redirect("/products/detalle/" + req.params.id)
        }
            
        )
        .catch(error =>console.log(error));
        // const products = loadProducts();
        
        // const {id} = req.params;
        // const {name, price, image, category, description} = req.body;

        // const productStringify = products.map(product => {
        //     if(product.id === +req.params.id){
        //         return{
        //             id,
        //             ...product,
        //             name : name,
        //             price : +price,
        //             category,
        //             description : description,
        //             image : product.image
        //         }
        //     }
        //     return product 
            
        // })
        // storeProduct(productStringify);
        // return res.redirect('/products/detalle/' + req.params.id)
    },
    
    crear : (req, res) => {
            // const categories = loadCategories();
            // return res.render('crearProducto', {
            //     categories :categories.sort()
            // })
            
            db.Category.findAll({
                order : ["name"]
            })
            
            .then(categories=>{
               // return res.send(req.body)
                return res.render("crearProducto",{
                    categories
                })
            })
            .catch(error => console.log(error))
    
    
    
        },
    store : (req, res) => {
        //return res.send(req.body)
        //return res.send(req.file)
        
         const {name,price,discount,description,category,file}=req.body;

         db.Product.create({
        
            name:name.trim(),
            price,
            discount,
            description,
            categoryId : category,
            file: req.files?req.files.filename:null,

            include:[
                {association:"images"}
            ]
            
         
         
        })
         
         .then(product => {
      return res.send(req.body)
        //  return res.send(req.files)

            return res.redirect("/products",product)
        })
        .catch(error => console.log(error))


    //     let products = loadProducts();
    //     const newProducts = {
    //         id: products[products.length - 1].id +1,
    //         name: name.trim(),
    //         price: +price,
    //         image: req.file.filename,
    //         category,
    //         description:description.trim(),
    //      }
         
    //      productsModify = [...products,newProducts];
    //      storeProduct(productsModify);
    //      return res.redirect("/products");
     },
    remove : (req,res)=>{
        //  return res.send()
  
        db.Product.destroy({
            where:{
                id: req.params.id
            }
        })
        .then(result => {
            console.log(result)
            return res.redirect("/products");
        })
        .catch(error =>console.log(error));



        // let productsModify= loadProducts().filter(product=>product.id !== +req.params.id);
        // storeProduct(productsModify);
        // return res.redirect("/products")
      },

    products: (req, res) => {
		// Do the magic

        db.Product.findAll({
            include:[

                {
                    association:"category"
                },
                {association:"images"}
            ]
        })

        .then(products => {
              //return res.send(products)
            res.render("products",{
            products

        })})
        .catch(error=> console.log(error));

		// let products = loadProducts();
		// return res.render("products",{
		// 	products,
		// })
	},
    
}