var express = require('express');
var router = express.Router();

/* Initialize the routers here */
/******************************/

var users = require('./users');

/* define routes for each router */
/******************************/
router.use('/users', users);

module.exports = router;
