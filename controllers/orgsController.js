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

// update an organization
module.exports.updateOrg = (req, res) => {
    if (req.user.isAdmin == 1) {
        let org = req.body;
        var sql = "UPDATE organizations SET regId = ?, name = ?, category = ? WHERE user_id = ?";
        mysqlConnection.query(sql, [org.regId, org.name, org.category, org.user_id], (err, rows, fields) => {
            if (!err)
                res.send('Updated organization id: ' + req.params.id);
            else
                console.log(err);
        })
    } else {
        res.send('You do not have permission to update an organization');
    }
}

// delete an organization
module.exports.deleteOrg = (req, res) => {
    if (req.user.isAdmin == 1) {
        mysqlConnection.query('DELETE FROM organizations WHERE regId = ?', [req.params.id], (err, rows, fields) => {
            if (!err)
                res.send('Deleted organization id: ' + req.params.id);
            else
                console.log(err);
        })
    } else {
        res.send('You do not have permission to delete an organization');
    }
}

// view all organizations by user id
module.exports.viewOrgsByUser = (req, res) => {
    mysqlConnection.query('SELECT * FROM organizations WHERE user_id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
}

// allow users to add new users to their organization if they are an admin
module.exports.addUserToOrg = (req, res) => {
    let org = req.body;
    if (req.user.isAdmin == 1) {
        var sql = "INSERT INTO organizations (user_id, organization_id, role) VALUES (?, ?, ?)";
        mysqlConnection.query(sql, [org.user_id, org.organization_id, org.role], (err, rows, fields) => {
            if (!err)
                rows.forEach(element => {
                    if (element.constructor == Array)
                        res.send('Inserted user id: ' + element[0].user_id);
                });
            else
                console.log(err);
        })
    } else {
        res.send('You do not have permission to add users to this organization');
    }
}

// allow users to remove users from their organization if they are an admin
module.exports.removeUserFromOrg = (req, res) => {
    let org = req.body;
    if (req.user.isAdmin == 1) {
        mysqlConnection.query('DELETE FROM organizations WHERE user_id = ? AND organization_id = ?', [org.user_id, org.organization_id], (err, rows, fields) => {
            if (!err)
                res.send('Deleted user id: ' + org.user_id);
            else
                console.log(err);
        })
    } else {
        res.send('You do not have permission to remove users from this organization');
    }
}


// allow users to view all users in their organization
module.exports.viewUsersInOrg = (req, res) => {
    mysqlConnection.query('SELECT * FROM organizations WHERE organization_id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
}

