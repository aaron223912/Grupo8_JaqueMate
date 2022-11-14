const db= require("../database/models")
const {loadProducts,loadCategories,storeProduct} = require('../data/db_moduls');


module.exports = {
    detalle : (req, res) => {
        // const products = loadProducts();
        // const product = products.find(product => product.id === +req.params.id);
        
        // return res.render('detalleDeProducto',{
        //     product
        // })
        let product = db.Product.findByPk(req.params.id,{
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
        let categories = db.Category.findAll()
        Promise.all([product,categories])
        .then(([product,categories]) => {
            //return res.send(categories)
            return res.render("detalleDeProducto",{
            product,
            categories

        })})
        .catch(error=> console.log(error));
        // .then(product =>{
        //     // return res.send(product)
        //     return res.render("detalleDeProducto",{
        //         product
        //     })
        // })
        // .catch(error => console.log(error))

    },
    editar : (req, res) => {
        const products = loadProducts();
        const categories = loadCategories();

        const product = products.find(product => product.id === +req.params.id);


        return res.render('editarProducto', {
            product,
            categories
        })
        
    },
    update : (req, res) => {
        const products = loadProducts();
        
        const {id} = req.params;
        const {name, price, image, category, description} = req.body;

        const productStringify = products.map(product => {
            if(product.id === +req.params.id){
                return{
                    id,
                    ...product,
                    name : name,
                    price : +price,
                    category,
                    description : description,
                    image : product.image
                }
            }
            return product 
            
        })
        storeProduct(productStringify);
        return res.redirect('/products/detalle/' + req.params.id)
    },
    
    crear : (req, res) => {
        

            // const categories = loadCategories();
            categories = db.Category.findAll()

            .then((categories) => {
                return res.render("crearProducto",{
                    categories
                })
            })
                    //     return res.redirect("/products/detalle/" + product.id)
                    // })
            
                
            //     categories :categories.sort()
            // })
            // const{name,price,discount,description,categoryId,file}= req.body;
            // db.Product.Create({
            //     ...req.body,
            //     name: name,
            // },
            // {include:[
    
            //     {
            //         association:"category"
            //     },
            //     {association:"images"}
            // ]})

            // .then(product=>{
            //     return res.send(req.body)
            //     return res.redirect("/products/detalle/" + product.id)
            // })
             .catch(error => console.log(error))
    
    
    
        },
    store : (req, res) => {
        //return res.send(req.body)
        //return res.send(req.file)
            
            const{name,price,discount,description,category,file}= req.body;
            newProduct=db.Product.create({
                ...req.body,
                name: name,
                price,
                discount,
                description,
                categoryId:category

            },
            {include:[
    
                {
                    association:"category"
                },
                {association:"images"}
            ]})



            

            let imageProduct = db.Image.create({
                file:file.filename
            })
            Promise.all([newProduct,imageProduct])
            .then(newProduct,imageProduct=>{
                //return res.send(req.body)
                return res.redirect("/products",{
                    newProduct,imageProduct
                })
            })
            .catch(error => console.log(error))

        // const {name,price,category,description}=req.body;
        // let products = loadProducts();
        // const newProducts = {
        //     id: products[products.length - 1].id +1,
        //     name: name.trim(),
        //     price: +price,
        //     image: req.file.filename,
        //     category,
        //     description:description.trim(),
        //  }
         
        //  productsModify = [...products,newProducts];
        //  storeProduct(productsModify);
        //  return res.redirect("/products");
    },
    remove : (req,res)=>{
        //  return res.send()
  
        let productsModify= loadProducts().filter(product=>product.id !== +req.params.id);
        storeProduct(productsModify);
        return res.redirect("/products")
      },
      gooCategory : (req,res)=>{

        // let products= db.Product.findAll({
        //     where: {
        //         categoryId : req.params.id
        //     },

        //     include:[ "images", "category"
        //     ]
        // })
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

        let products= db.Product.findAll({
            attributes:["id","name","price","discount","description"],
            include:[

                {
                    association:"category",
                    attributes:["id","name"],
                },
                 {association:"images"}
            ]
        })
        let categories = db.Category.findAll()

        Promise.all([products,categories])
        .then(([products,categories]) => {
              //return res.send(products)
            res.render("products",{
            products,
            categories
            

        })})
        .catch(error=> console.log(error));

		// let products = loadProducts();
		// return res.render("products",{
		// 	products,
		// })
	},
    
}