const express = require('express');
const Router = express.Router();
const passport = require('passport');
require('../config/passport');

const { passportCallback, logout } = require('../controllers/authController');

Router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));
Router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/api/auth/failed' }), passportCallback);
Router.get('/failed', (req, res) => res.send('You Failed to log in!'));
Router.get('/success', (req, res) => res.send(`Welcome ${req.user.displayName}!`));
Router.get('/logout', logout);
module.exports = Router;