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
        return res.send(req.body)
    }
    
}