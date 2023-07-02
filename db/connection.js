var mysql = require('mysql');

var con = mysql.createPool({
    connectionLimit : 10,
    host: "sql12.freesqldatabase.com",
    user: "sql12628680",
    password: "VtG4xBRXRY",
    database: "sql12628680",
     port: 3306
});
module.exports = con;    