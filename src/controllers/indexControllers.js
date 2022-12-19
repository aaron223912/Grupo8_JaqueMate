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
            order: Sequelize.literal('rand()'),
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


       //random Mate

       let productsRandomMate= db.Product.findAll({
        order: Sequelize.literal('rand()'),
        where:{
            categoryId : 1
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

    //random Bombilla 

    let productsRandomBombilla= db.Product.findAll({
        order: Sequelize.literal('rand()'),
        where:{
            categoryId : 2
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

    //random Termo 

    let productsRandomTermo= db.Product.findAll({
        order: Sequelize.literal('rand()'),
        where:{
            categoryId : 3
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

    //random porta mates 

    let productsRandomPortaMates= db.Product.findAll({
        order: Sequelize.literal('rand()'),
        where:{
            categoryId : 4
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

    //random Yerbero

    let productsRandomYerbero= db.Product.findAll({
        order: Sequelize.literal('rand()'),
        where:{
            categoryId : 5
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

        

       
        Promise.all([products,categories,  productsDiscount, categoryRandom, productsRandom, productsRandomYerbero, productsRandomBombilla,
            productsRandomPortaMates, productsRandomTermo, productsRandomMate ])
        .then(([products,categories,  productsDiscount, categoryRandom, productsRandom, productsRandomYerbero, productsRandomBombilla,
            productsRandomPortaMates, productsRandomTermo, productsRandomMate]) => {
            console.log('------------------------');
            //return res.send(productsCategoryRandom)
            res.render("index",{
            products,
            categories,
            productsDiscount,
            categoryRandom,
            productsRandom,
            productsRandomYerbero,
            productsRandomPortaMates,
            productsRandomTermo,
            productsRandomBombilla,
            productsRandomMate
            

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

        let categories = db.Category.findAll()

        .then(categories => {
            return res.render('carrito',{
                categories
            })
        })
        .catch(error => console.log(error))

    }
}

    
