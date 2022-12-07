const mysql = require('mysql');
const mysqlConnection = require('../config/mysql');

module.exports.viewAllUsers = (req, res) => {
    mysqlConnection.query('SELECT * FROM users', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
}