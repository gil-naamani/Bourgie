var express = require('express');
var router = express.Router();
var pool = require('../db').pool;

router.get('/:username', function(req, res, next) {

  var user = req.params.username;

  var sql = 'SELECT '+
              'user_category_id, '+
              'username, '+
              'category_name, '+
              'allocation '+
            'FROM categories '+
            'WHERE username = "'+ user + '"';

  console.log(sql);
  pool.getConnection(function(err, db){

    db.query(sql, function(err, rows, fields){
      db.release();
      if (!err){
        res.send({type : true,
                  data : rows,
                  err  : null});
      } else {
        res.send({type : false,
                  data : null,
                  error : err});
      };
    })
  });
});

router.put('/:id', function(req, res, next) {

  var id = req.params.id;
  var category_name = req.body.category_name;
  var allocation = req.body.allocation;

  var sql = 'UPDATE categories '+
            ' SET category_name = "'+ category_name +'", allocation = '+ allocation +
            ' WHERE user_category_id = '+ id;

  console.log(sql);
  pool.getConnection(function(err, db){
    db.query(sql, function(err, rows, fields){
      db.release();
      if (!err){
        res.send({
          type : true,
          data : null,
          error : null
        });
      } else {
        res.send({
          type : false,
          data : { user_category_id : id },
          error : err
        });
      };
    });
  });
});

router.post('/', function(req, res, next) {

  var user = req.body.username;
  var category_name = req.body.category_name;
  var allocation = req.body.allocation;

  var sql = 'INSERT INTO categories '+
            '(username, category_name, allocation) ' +
            'VALUES ("'+ user +'","'+ category_name +'",'+ allocation +')';

  console.log(sql);
  pool.getConnection(function(err, db){
    db.query(sql, function(err, rows, fields){
      db.release();
      if (!err){
        res.send({
          type : true,
          data : null,
          error : null
        });
      } else {
        res.send({
          type : false,
          data : { user_category_id : id },
          error : err
        });
      };
    });
  });
});

router.delete('/:id', function(req, res, next) {

  var id = req.params.id;

  var sql = 'DELETE FROM categories '+
            'WHERE user_category_id = '+id;

  console.log(sql);
  pool.getConnection(function(err, db){
    db.query(sql, function(err, rows, fields){
      db.release();
      if (!err){
        res.send({
          type : true,
          data : null,
          error : null
        });
      } else {
        res.send({
          type : false,
          data : { user_category_id : id },
          error : err
        });
      };
    });
  });
});

module.exports = router;
