var mongoose = require('mongoose');

var Category = new mongoose.Schema({
  title: { type : String , required : true },
  amt: Number
});

mongoose.model('Category', Category);
