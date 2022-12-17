const db= require("../database/models")
const {loadProducts} = require('../data/db_moduls');
const { Op } = require('sequelize');
const { Sequelize } = require("../database/models");

module.exports = {
    index : (req, res) => {
       let products= db.Product.findAll({
            limit: 4,
            attributes:["id","name","price","discount","description"],
            include:[

                {
                    association:"category",
                    attributes:["id","name"],
                },
                 {association:"images"}
            ]
        })

        let productsDiscount = db.Product.findAll({
            where:{
                discount: {
					[Op.gt]: 10
				}
			},
            limit: 4,
            attributes:["id","name","price","discount","description"],
            include:[

                {
                    association:"category",
                    attributes:["id","name"],
                },
                 {association:"images"}
            ]
        })

        let productsRandom= db.Product.findAll({
            order: Sequelize.literal('rand()'),
            limit: 4,
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


        let categoryRandom = db.Category.findAll({
            order: Sequelize.literal('rand()'),
            limit: 1
        })

        let category_id = categoryRandom.id


       /* let productsCategoryRandom = db.Product.findAll({
            where:{categoryId: category_id}
        })*/

        

       
        Promise.all([products,categories,  productsDiscount, categoryRandom, productsRandom ])
        .then(([products,categories,  productsDiscount, categoryRandom, productsRandom]) => {
            console.log('------------------------');
            //return res.send(productsCategoryRandom)
            res.render("index",{
            products,
            categories,
            productsDiscount,
            categoryRandom,
            productsRandom
            

        })})
        .catch(error=> console.log(error));
    },
    search: (req, res) => {
		// Do the magic
		const {keywords} = req.query;

		let productsSerch = db.Product.findAll({
			where : {
				[Op.or] : [
					{
						name: {
							[Op.substring]: keywords
						}
					},
					{
						description: {
							[Op.substring]: keywords
						}
					}
				]
			},
			include : ['images']
		})

        let categories = db.Category.findAll()

        Promise.all([productsSerch, categories])
			.then(([productsSerch, categories]) => {
				return res.render('result', {
					products : productsSerch,
					keywords,
                    categories
				})
			})
			.catch(error => console.log(error))

	},
    

    carrito : (req, res) => {
        return res.render('carrito')
    }
}

    
