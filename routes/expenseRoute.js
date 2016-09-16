var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var responseObj = require('../res').responseObj;
var Expense = mongoose.model('Expense')


//* GET routes
//****************

router.get('/', function(req, res, next) {
  Expense.find(function(err, expenses){
    if(err){
      res.send(responseObj.failure({}, err));
    }

    res.send(responseObj.success(expenses));
  });
});

router.get('/:id', function(req, res, next) {

  Expense.findOne({_id:req.params.id},function(err, exp){
    if(err){
      res.send(responseObj.failure(req.params.id, err));
    }

    res.send(responseObj.success(exp));
  });

});

//* POST routes
//****************

router.post('/', function(req, res, next) {

  var expense = new Expense(req.body);

  expense.save(function(err, exp){
    if(err){
        res.send(responseObj.failure({}, err));
     }

    res.send(responseObj.success(exp));
  });
});

//* PUT routes
//****************

router.put('/:id', function(req, res, next) {

  var query = {_id: req.params.id},
      update = { title: req.body.title, amt: req.body.amt, category: req.body.category},
      options = { upsert: true };

  // Find the category and update
  Expense.findOneAndUpdate(query, update, options, function(err, exp) {
      if (!err) {
          // send error if the user doesn't exist
          if (!exp) {
            res.send(responseObj.failure({}, 'expense not found'));
          }
          // update the user's token
          exp.save(function(err, exp) {
            if(err){ return next(err); }

            res.send(responseObj.success(exp));
          });
      }
  });
});

//* DELETE routes
//****************

router.delete('/:id', function(req, res, next){

  Expense.remove({ _id: req.params.id }, function(err) {
    if (!err) {
      res.send(responseObj.success());
    }
    else {
      res.send(responseObj.failure({ id : req.params.id }, 'error deleting expense'));
    }
  });
});

module.exports = router;
