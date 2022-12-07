const mysql = require('mysql');
require('dotenv').config();

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: process.env.MY_SQL_USERNAME,
    password: process.env.MY_SQL_PWD,
    database: process.env.MY_SQL_DB,
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB connection succeded.');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});

module.exports = mysqlConnection;
