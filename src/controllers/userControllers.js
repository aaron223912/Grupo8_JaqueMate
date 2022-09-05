

module.exports = {
    login : (req, res) => {
        return res.render('login')
    },
    registro : (req, res) => {
        return res.render('registro')
    },
   storeUsers : (req,res)=>{
        return res.send(req.body)
   }

}