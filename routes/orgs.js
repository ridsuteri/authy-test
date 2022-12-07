const express = require('express');
const Router = express.Router();

const { viewAllOrgs, viewOrg, addOrg} = require('../controllers/orgsController');


Router.get('/all', viewAllOrgs);
Router.get('/:id', viewOrg);
Router.post('/add', addOrg);


module.exports = Router;