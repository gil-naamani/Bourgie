var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var pool = require('../db').pool;

router.get('/:username', function(req, res, next) {

  var user = req.params.username;

  var sql = 'SELECT count(*) AS count FROM users '+
            'WHERE username = "'+ user + '"';

  console.log(sql);
  pool.getConnection(function(err, db){

    db.query(sql, function(err, rows, fields){
      db.release();
      if (!err){
        if (rows[0]["count"] > 0){
          res.send({type : true});
        } else {
          res.send({type : false});
        }
      } else {
        res.send({type : false,
                  data : null,
                  error : err});
      };
    })
  });
});

router.put('/signin/', function(req, res, next) {

  var username = req.body.username;
  var password = req.body.password;
  var tkn = newToken(username);
  var hash = md5hash(password);

  var sql = 'UPDATE users SET token = "'+ tkn + '" '+
            'WHERE username = "'+ username +'" '+
            'AND password = "'+ hash +'"';

  console.log(sql);
  pool.getConnection(function(err, db){

    db.query(sql, function(err, rows, fields){
      db.release();
      if (!err){
        //success! but did we actually find a user to update?
        numFound = rows["affectedRows"];
        if (numFound){
          res.send({
            type : true,
            data : { username : username, token : tkn},
            error : null
          });
        } else {
          res.send({
            type : false,
            data : { username : username, token : null},
            error : 'invalid username or password'
          });
        };
      } else {
        res.send({
          type : false,
          data : { username : username, token : null},
          error : err["code"]
        });
      };
    });
  });
});

router.post('/signup/', function(req, res, next) {

  var username = req.body.username;
  var password = req.body.password;
  var tkn = newToken(username);
  var hash = md5hash(password);


  var sql = 'INSERT INTO users (username, password, token) ' +
            'VALUES ("'+ username +'","'+ hash +'","'+ tkn +'")';

  console.log(sql);
  pool.getConnection(function(err, db){

    db.query(sql, function(err, rows, fields){
      db.release();
      if (!err){
        res.send({
          type : true,
          data : { username : username, token : tkn},
          error : null
        });
      } else {
        if (err["errno"] === 1062){
          res.send({
            type : false,
            data : { username : username, token : null},
            error : 'username already exists'
          });
        } else {
          res.send({
            type : false,
            data : { username : username, token : null},
            error : err["code"]
          });
        };
      };
    });
  });
});


var newToken = function(username){
  return jwt.sign({user : username}, process.env.JWT_SECRET, { expiresIn: '1h' });
};

var md5hash = function(password){
  return crypto.createHash('md5').update(password).digest('hex');
};

module.exports = router;
