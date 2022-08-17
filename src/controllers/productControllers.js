const {loadProducts,loadCategorys} = require('../data/db_moduls');


module.exports = {
    detalle : (req, res) => {
        return res.render('detalleDeProducto')
    },
    editar : (req, res) => {
        return res.render('editarProducto')
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