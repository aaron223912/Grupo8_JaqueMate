

module.exports = {
    detail : (req, res) => {
        return res.render('detalleDeProducto')
    },
    crear : (req, res) => {
        return res.render('agregarProductos')
    },
    edit : (req, res) => {
        return res.render('editarProductos')
    }
}
