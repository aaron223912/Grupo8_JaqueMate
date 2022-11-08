const db= require("../database/models")
const {loadProducts} = require('../data/db_moduls');

module.exports = {
    index : (req, res) => {
        // const products = loadProducts();
        // return res.render('index',{
        //     products
        // })
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
            res.render("index",{
            products,
            categories
            

        })})
        .catch(error=> console.log(error));
    },
    

    carrito : (req, res) => {
        return res.render('carrito')
    }
}