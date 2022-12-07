const mysql = require('mysql');
const mysqlConnection = require('../config/mysql');

module.exports.viewAllOrgs = (req, res) => {
    mysqlConnection.query('SELECT * FROM organizations', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
}

// view a single organization by id
module.exports.viewOrg = (req, res) => {
    mysqlConnection.query('SELECT * FROM organizations WHERE regId = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
}

// add a new organization
module.exports.addOrg = (req, res) => {
    if (req.user.isAdmin == 1) {
        let org = req.body;
        var sql = "INSERT INTO organizations (regId, name, category, user_id) VALUES (?, ?, ?, ?)";
        mysqlConnection.query(sql, [org.regId, org.name, org.category, req.user.email], (err, rows, fields) => {
            if (!err)
                rows.forEach(element => {
                    if (element.constructor == Array)
                        res.send('Inserted organization id: ' + element[0].regId);
                });
            else
                console.log(err);
        })
    } else {
        res.send('You do not have permission to add an organization');
    }
}

