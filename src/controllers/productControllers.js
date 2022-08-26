const {loadProducts,loadCategorys,storeProduct} = require('../data/db_moduls');


module.exports = {
    detalle : (req, res) => {
        const products = loadProducts();
        const product = products.find(product => product.id === +req.params.id);
        console.log('hola');

        return res.render('detalleDeProducto',{
            product
        })
    },
    editar : (req, res) => {
        const products = loadProducts();
        const categorys = loadCategorys();

        const product = products.find(product => products.id = +req.params.id);


        return res.render('editarProducto', {
            product,
            categorys
        })
    },
    update : (req, res) => {
        const products = loadProducts();
        const categorys = loadCategorys();
        const {id} = req.params;
        const {name, price, image, category, description} = req.body;

        const productStringify = products.map(product => {
            if(product.id === +req.params.id){
                return{
                    ...product,
                    name,
                    price,
                    image,
                    category,
                    description
                }
            }
            return product
        })
        storeProduct(productStringify);
        return res.redirect('/products/detalle/:id' + req.params.id)
    },
    crear : (req, res) => {
        const categorys = loadCategorys();
        return res.render('crearProducto', {
            categorys :categorys.sort()
        })
    },
    store : (req, res) => {
        return res.send(req.body)
    }
    
}