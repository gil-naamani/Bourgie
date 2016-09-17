var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var responseObj = require('../res').responseObj;
var Category = mongoose.model('Category')
var User = mongoose.model('User');


//* GET routes
//****************

router.get('/', function(req, res, next) {
  Category.find(function(err, categories){
    if(err){
      res.send(responseObj.failure({}, err));
    }

    res.send(responseObj.success(categories));
  });
});

router.get('/:id', function(req, res, next) {

  Category.findOne({_id:req.params.id},function(err, cat){
    if(err){
      res.send(responseObj.failure(cat, err));
    }

    res.send(responseObj.success(cat));
  });

});

//* POST routes
//****************

router.post('/', function(req, res, next) {

  var category = new Category(req.body);

  category.save(function(err, cat){
    if(err){
        res.send(responseObj.failure({}, err));
     }

    res.send(responseObj.success(cat));
  });
});

//* PUT routes
//****************

router.put('/:id', function(req, res, next) {

  var query = {_id: req.params.id},
      update = { title: req.body.title, amt: req.body.amt},
      options = { upsert: true };

  // Find the category and update
  Category.findOneAndUpdate(query, update, options, function(err, cat) {
      if (!err) {
          // send error if the user doesn't exist
          if (!cat) {
            res.send(responseObj.failure({}, 'category not found'));
          }
          // update the user's token
          cat.save(function(err, cat) {
            if(err){ return next(err); }

            res.send(responseObj.success(update));
          });
      }
  });
});

//* DELETE routes
//****************

router.delete('/:id', function(req, res, next){

  Category.remove({ _id: req.params.id }, function(err) {
    if (!err) {
      res.send(responseObj.success());
    }
    else {
      res.send(responseObj.failure({ id : req.params.id }, 'error deleting category'));
    }
  });
});

module.exports = router;
