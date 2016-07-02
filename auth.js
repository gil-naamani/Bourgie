var isAuthorized = function(req, res, next) {
    var bearerToken;
    var bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        req.token = bearerToken;
        // TODO:
        // verify that the token is valid
        // check if the token exits - if not error
        // check if the token has not expired - if not error
        next();
    } else {
        res.send(403);
    }
}

exports.isAuthorized = isAuthorized;
