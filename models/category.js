var mongoose = require('mongoose');

var Category = new mongoose.Schema({
  title: { type : String , required : true },
  amt: Number
});

Category.pre('remove', function(callback) {
    // Remove all the docs that refers
    this.model('User').remove({ categories: this._id }, callback);
    this.model('Expense').remove({ category: this._id}, callback);
});

mongoose.model('Category', Category);
