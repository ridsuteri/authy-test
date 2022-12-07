const mysqlConnection = require('../config/mysql');

module.exports.passportCallback = (req, res, next) => {
    const { email, displayName, picture } = req.user;
    // console.log("req.session: ", req.session)
    
    // set user as admin if email is any of the following
    if (email === 'ridsuteri@gmail.com' || email === 'admin@gmail.com') {
        req.session.isAdmin = 1;
        isAdmin = 1;
    }else
        isAdmin = 0;
    
        const user = {
        email,
        displayName,
        picture,
        isAdmin
    }

    const sql = `SELECT * FROM users WHERE email = '${email}'`;
    console.log("sql: ", sql);
    mysqlConnection.query(sql
        , (err, result) => {
            if (err) throw err;
            if (result.length === 0) {
                const sql = `INSERT INTO users (email, name, picture, isAdmin) VALUES ('${email}', '${displayName}', '${picture}', '${user.isAdmin}')`;
                mysqlConnection.query
                    (sql, (err, result) => {
                        if (err) throw err;
                        console.log(result);
                    });
            }
            req.session.user = user;
            res.redirect('/api/auth/success');
        });
}

module.exports.logout = (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
}
