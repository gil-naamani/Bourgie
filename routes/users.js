var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var jwt = require("jsonwebtoken");

var pool = require('../db').pool;

router.get('/:username', function(req, res, next) {

  var sql = 'SELECT count(*) from users';

  pool.getConnection(function(err, db){

    db.query(sql, function(err, rows, fields){
      db.release();
      if (!err){
        res.send(rows[0]);
      } else {
        res.send(err);
      };
    })
  });
});

router.put('/signin/', function(req, res, next) {

  var username = req.body.username;
  var password = req.body.password;

  var sql = 'UPDATE users SET token = "'+ newToken(username) + '" '+
            'WHERE username = "'+ username +'" '+
            'AND password = "'+ md5hash(password) +'"';

  console.log(sql);
  pool.getConnection(function(err, db){

    db.query(sql, function(err, rows, fields){
      db.release();
      if (!err){
        res.send(rows);
      } else {
        res.send(err);
      };
    })
  });
});

router.post('/signup/', function(req, res, next) {

  var username = req.body.username;
  var password = req.body.password;

  var sql = 'INSERT INTO users (username, password, token) ' +
            'VALUES ("'+ username +'","'+ md5hash(password) +'","'+
             newToken(username)+'")';

  console.log(sql);
  pool.getConnection(function(err, db){

    db.query(sql, function(err, rows, fields){
      db.release();
      if (!err){
        res.send(rows);
      } else {
        res.send(err);
      };
    })
  });
});

var newToken = function(username){
  return jwt.sign(username, process.env.JWT_SECRET);
};

var md5hash = function(password){
  return crypto.createHash('md5').update(password).digest('hex');
};

module.exports = router;
