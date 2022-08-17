const {loadProducts} = require('../data/db_moduls');

module.exports = {
    index : (req, res) => {
        const products = loadProducts();
        return res.render('index',{
            products
        })
    },
    carrito : (req, res) => {
        return res.render('carrito')
    }
}