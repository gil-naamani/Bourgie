var mongoose = require('mongoose');
var User = mongoose.model('User');
var Category = mongoose.model('Category');

var Expense = new mongoose.Schema({
  title: { type : String , required : true },
  description: { type : String , required : true },
  amt: Number,
  timestamp: {type: Date, default: Date.now},
  user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
  category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'
        }

});

mongoose.model('Expense', Expense);
