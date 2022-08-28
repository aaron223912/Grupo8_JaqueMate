const {loadProducts,loadCategories,storeProduct} = require('../data/db_moduls');


module.exports = {
    detalle : (req, res) => {
        const products = loadProducts();
        const product = products.find(product => product.id === +req.params.id);
        
        return res.render('detalleDeProducto',{
            product
        })
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
            const categories = loadCategories();
            return res.render('crearProducto', {
                categories :categories.sort()
            })
    },
    store : (req, res) => {
        //return res.send(req.body)

        const {name,price,image,category,description}=req.body;
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
		let products = loadProducts();
		return res.render("products",{
			products,
		})
	},
    
}