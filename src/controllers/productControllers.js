const db= require("../database/models")
const {loadProducts,loadCategories,storeProduct} = require('../data/db_moduls');
const { validationResult, Result} = require("express-validator");
const {error} = require("console")


module.exports = {
    detalle : (req, res) => {

        let product = db.Product.findByPk(req.params.id,{
           
            
                include:[
    
                    {
                        association:"category"
                    },
                    {association:"images"},
                ]
            
        })
        let categories = db.Category.findAll()

    
        Promise.all([product,categories])
        .then(([product,categories]) => {
            return res.render("detalleDeProducto",{
            product,
            categories

        })})
        .catch(error=> console.log(error));

    },
    editar : (req, res) => {

        let product = db.Product.findByPk(req.params.id);

        let categories = db.Category.findAll({
            attributes : ['id','name'],
			order : ['name']
        });

        Promise.all([product, categories])
            .then(([product,categories])=>{
                res.render("editarProducto",{
                    product:product, categories:categories
                })
            })
            .catch(error=> console.log(error));

//             <% categories.forEach(category => { %>
//                 <% if (category.id == product.category.id) { %>
//      <option value="<%=category.id%>" selected><%=category.name%></option>
   
//      <% }else{ %> 
//        <option value="<%=category.id%>"><%=category.name%></option>
//    <% } %>
   
//                <%}) %>


        // categories = db.Category.findAll()

        //     .then((categories) => {
        //         return res.render("editarProducto",{
        //             categories
        //         })
        //     })
        //     .catch(error=> console.log(error));
        
    },
    update : (req, res) => {
        db.Product.update({

            name: req.body.name,
            price: req.body.price,
            discount: req.body.discount,
            description:req.body.description,
            categoryId:req.body.category

        },{
            where : {
                id : req.params.id
            }
        })
        .then(async(product)=>{
          if (req.files.length) {
            let images = req.files.map(file=>({
                file:file.filename,
                productId:product.id,
                createdAt:new Date()
            }))
           await db.Image.bulkCreate(images,{
                        validate:true
                    })
                    
        }  
        return res.redirect("/products/detalle/" + req.params.id)
        })
        .catch(error => console.log(error))

       
    },
    
    crear : (req, res) => {
        

            // const categories = loadCategories();
            categories = db.Category.findAll()

            .then((categories) => {
                return res.render("crearProducto",{
                    categories
                })
            })
                    
             .catch(error => console.log(error))
        },
    store : (req, res) => {
        //return res.send(req.body)
        //return res.send(req.file)
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            db.Product.create({
                    
            name: req.body.name,
            price: req.body.price,
            discount: req.body.discount,
            description:req.body.description,
            categoryId:req.body.category

        })
        .then(async(product)=>{
          if (req.files.length) {
            let images = req.files.map(file=>({
                file:file.filename,
                productId:product.id,
                createdAt:new Date()
            }))
           await db.Image.bulkCreate(images,{
                        validate:true
                    })
                    
        }  
        return res.redirect("/products")
        })
        .catch(error => console.log(error))
        }else{
            categories = db.Category.findAll()

            
            .then((categories) => {
                return res.render("crearProducto",{
                    categories,
                    errors:errors.mapped()
                })
            })
            .catch(error => console.log(error))
        }

        
    },
    destroy : (req,res)=>{
        //  return res.send()
        db.Product.destroy({
            where : {
                id : req.params.id
            }
        })
        .then(()=>res.redirect("/products"))
        .catch(error => console.log(error))
        // let productsModify= loadProducts().filter(product=>product.id !== +req.params.id);
        // storeProduct(productsModify);
        // return res.redirect("/products")
      },
      gooCategory : (req,res)=>{

        let category= db.Category.findByPk(req.params.id,{

            include:[

                {
                association:"products",
                include: ["images"]
                }
            ]
        })
        let categories = db.Category.findAll()
        
        Promise.all([category,categories])
        .then(([category,categories]) => {
              //return res.send(products)
              //return res.send(category)
            res.render("products",{
            products:category.products,
            category,
            categories

        })
      })
        .catch(error=> console.log(error));
    },

    products: (req, res) => {
		// Do the magic

        let products = db.Product.findAll({
            attributes:["id","name","price","discount","description"],
            include:[

                {
                    association:"category",
                    attributes:["id","name"],

                },
                 {association:"images"}
            ]
        })
        let categories = db.Category.findAll({
            attributes:["id","name"]
        })
        Promise.all([products,categories])
        .then(([products,categories]) => {
            // return res.send(products)
            res.render("products",{
            products,
            categories

        })})
        .catch(error=> console.log(error));
	},

    
}