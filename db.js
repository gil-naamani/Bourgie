var mysql = require('mysql');

var dbName = process.env.DBNAME,
    dbHost = process.env.DBHOST,
    dbPort = process.env.DBPORT,
    dbUser = process.env.DBUSER,
    dbPswd = process.env.DBPSWD;

// use process.env variables if set, otherwise change below to match
// local database instance
var pool = mysql.createPool({
    host      : dbHost || 'localhost',
    port      : dbPort || 3306,
    user      : dbUser || 'root',
    password  : dbPswd || '',
    database  : dbName || 'bourgie'
});

exports.pool = pool;
