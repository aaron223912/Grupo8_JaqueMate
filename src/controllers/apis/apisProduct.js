const db = require('../../database/models');
const sequelize = db.sequelize;


module.exports = {
    'list': async (req,res) => {
        try {

            let {count, rows : product} = await db.Product.findAndCountAll()

            return res.status(200).json({
                ok : true,
                total : count,
                product
            })
            
        } catch (error) {
            return res.status(error.status || 500).json({
                ok : false,
                msg : error.message || 'Comunicate con el admnistrador'
            })
        }
    },
    'detail':  async (req,res) => {
        try {

            let product = await db.Product.findByPk(req.params.id)

            return res.status(200).json({
                ok : true,
                product
            })
            
        } catch (error) {
            return res.status(error.status || 500).json({
                ok : false,
                msg : error.message || 'Comunicate con el admnistrador'
            })
        }
    },
    'update': async (req, res) => {
        // Do the magic
        try {
    
            const product = await db.Product.update({

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
            if (req.files.length) {
                let images = req.files.map(file=>({
                    file:file.filename,
                    productId:product.id,
                    createdAt:new Date()
                }))
               await db.Image.update(images,{
                            validate:true
                        })
                    }
    
            return res.status(201).json({
                ok : true,
                data : product
            });
    
    
        } catch (error) {
            console.log(error)
    
            return res.status(error.status || 500).json({
                ok: false,
                errors : error.message
            });
        }
    },
    'store': async (req, res) => {
    // Do the magic
    try {

        const product = await db.Product.create({
            name: req.body.name,
            price: req.body.price,
            discount: req.body.discount,
            description:req.body.description,
            categoryId:req.body.category
        });
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

        return res.status(201).json({
            ok : true,
            data : product
        });


    } catch (error) {
        console.log(error)

        return res.status(error.status || 500).json({
            ok: false,
            errors : error.message
        });
    }
},
'destroy' : async (req, res) => {

    try {

        let product = await db.Product.findByPk(req.params.id);

        await product.destroy()

        return res.status(200).json({
            ok : true,
            msg : 'Pelicula eliminada con éxito!'
        })

        
    } catch (error) {
        console.log(error)
        return res.status(error.status || 500).json({
            ok: false,
            errors : error.message,
        });
    }
}
}
