var jwt = require('jsonwebtoken');


var isAuthorized = function(req, res, next) {
    var bearerToken;
    var bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        req.token = bearerToken;
        // check if the token has expired - send 403 if so
        //TODO: otherwise make sure that the user is valid
        jwt.verify(bearerToken, process.env.JWT_SECRET, function(err, decoded){
          if (err) res.sendStatus(403);
        });
        next();
    } else {
        res.sendStatus(403);
    }
}

exports.isAuthorized = isAuthorized;
