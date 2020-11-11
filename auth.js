

exports.ensureAuthenticated = function ensureAuthenticated(req, res, next) {
    if(req.isAuthenticated() || req.user || require('connect-ensure-login').ensureLoggedIn())
        return next()

    res.status(400).send({msg: "Not logged in."})
}