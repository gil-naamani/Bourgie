var express = require('express');
var router = express.Router();
var pool = require('../db').pool;


/* GET users listing. */
// router.get('/', function(req, res, next) {
//   console.log('at users route');
//   res.send('respond with a resource');
// });

router.get('/:username', function(req, res, next) {

  var sql = 'SELECT count(*) from users';

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

router.post('/', function(req, res, next) {
  
  var username = req.body.username;
  var password = req.body.password;

  var sql = 'INSERT INTO users (username, password, token) ' +
            'VALUES ("'+ username +'","'+ password +'","xxxxx")';

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

module.exports = router;
