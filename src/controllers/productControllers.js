const db= require("../database/models")
const {loadProducts,loadCategories,storeProduct} = require('../data/db_moduls');


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
            // return res.render('crearProducto', {
            //     categories :categories.sort()
            // })
            const{name,price,discount,description,categoryId}= req.body;
            db.Product.Create({
                ...req.body,
                name: name.trim(),
            },
            {include:[
    
                {
                    association:"category"
                },
                {association:"images"}
            ]})
            .then(product=>{
                return res.send(req.body)
                return res.redirect("/products/detalle/" + product.id)
            })
            .catch(error => console.log(error))
    
    
    
        },
    store : (req, res) => {
        //return res.send(req.body)
        //return res.send(req.file)
        
        const {name,price,category,description}=req.body;
        let products = loadProducts();
        const newProducts = {
            id: products[products.length - 1].id +1,
            name: name.trim(),
            price: +price,
            image: req.file.filename,
            category,
            description:description.trim(),
         }
         
         productsModify = [...products,newProducts];
         storeProduct(productsModify);
         return res.redirect("/products");
    },
    remove : (req,res)=>{
        //  return res.send()
  
        let productsModify= loadProducts().filter(product=>product.id !== +req.params.id);
        storeProduct(productsModify);
        return res.redirect("/products")
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
            //  return res.send(products)
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