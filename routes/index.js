const express = require('express');
const Router = express.Router();

const authRoutes = require('./auth');
const usersRoutes = require('./users');
const orgsRoutes = require('./orgs');

const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}

Router.use('/auth', authRoutes);
Router.use('/users/', isLoggedIn, usersRoutes);
Router.use('/orgs/', isLoggedIn, orgsRoutes);

module.exports = Router;