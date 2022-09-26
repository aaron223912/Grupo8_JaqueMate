module.exports = (req, res, next) => {
    if(req.cookies && req.cookies.jaquemate) {
        req.session.userLogin = req.cookies.jaquemate
    }
    next()
}