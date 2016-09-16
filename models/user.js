var mongoose = require('mongoose');
var Category = mongoose.model('Category');

var User = new mongoose.Schema({
  username: { type : String , unique : true, required : true },
  password: { type : String , required : true },
  token: String,
  last_login: {type: Date, default: Date.now},
  amt: Number,
  categories: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'
        }]
});

mongoose.model('User', User);
