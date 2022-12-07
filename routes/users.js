const express = require('express');
const Router = express.Router();

const { viewAllUsers } = require('../controllers/usersController');

Router.get('/all', viewAllUsers);

module.exports = Router;