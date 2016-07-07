var express = require('express');
var router = express.Router();
var pool = require('../db').pool;

router.get('/:username', function(req, res, next) {

  var user = req.params.username;

  var sql = 'SELECT '+
              'schedule_id, '+
              'user_category_id, '+
              'name, '+
              'amount, '+
              'repeat_interval, '+
              'next_due_date '+
            'FROM schedules '+
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
  var user = req.body.username;
  var category = req.body.category;
  var name = req.body.name;
  var amount = req.body.amount;
  var interval = req.body.interval;
  var due = req.body.due_date;

  var sql = 'UPDATE schedules '+
            ' SET username = "'+ user +'", user_category_id = '+ category +
            ', name = "'+ name +'", amount = '+ amount +
            ', repeat_interval = "'+ interval +'", next_due_date = '+ due +
            ' WHERE schedule_id = '+ id;

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
          data : { username : username, token : null},
          error : err
        });
      };
    });
  });
});

router.post('/', function(req, res, next) {

  var user = req.body.username;
  var category = req.body.category;
  var name = req.body.name;
  var amount = req.body.amount;
  var interval = req.body.interval;
  var due = req.body.due_date;

  var sql = 'INSERT INTO schedules '+
            '(username, user_category_id, name, amount, repeat_interval, next_due_date) ' +
            'VALUES ("'+ user +'",'+ category +',"'+ name +'",'+ amount +
            ',"'+ interval +'",'+ due +')';

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
          data : { username : username, token : null},
          error : err
        });
      };
    });
  });
});

module.exports = router;
