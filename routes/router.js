var express = require('express');
var router = express.Router();

/* Initialize the individual routers here */
/******************************/

var userRoute = require('./userRoute');
var categoryRoute = require('./categoryRoute');
var expenseRoute = require('./expenseRoute');
var users = require('./users');
var schedule = require('./schedule');
var categories = require('./categories');

/* define routes for each router */
/******************************/

router.use('/user', userRoute);
router.use('/category', categoryRoute);
router.use('/expense', expenseRoute);
router.use('/users', users);
router.use('/schedule', schedule);
router.use('/categories', categories);

module.exports = router;
