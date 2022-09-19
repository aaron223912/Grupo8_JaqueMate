module.exports = (req, res, next) => {
    if(req.cookies.jaquemate) {
        req.session.userLogin = req.cookies.jaquemate
    }
    next()
}