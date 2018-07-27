module.exports = {
    checkLoggedIn: (req, res, next) =>{
        console.log(req.session.user)
        if (!req.session.user){
            res.send('redirect').status(403)
        } else {
            next()
        }
    }
}