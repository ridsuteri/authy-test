const express = require('express');
const Router = express.Router();

const { viewAllUsers, updateOrg, deleteOrg, viewOrgsByUser } = require('../controllers/usersController');
// managing users in an organization
const { addUserToOrg, removeUserFromOrg, viewUsersInOrg } = require('../controllers/orgsController');

Router.get('/all', viewAllUsers);
Router.put('/update/:id', updateOrg);
Router.delete('/delete/:id', deleteOrg);
Router.get('/user/:id', viewOrgsByUser);

// routes for allowing user to add new users to an organization
Router.post('/addUserToOrg', addUserToOrg);
Router.delete('/removeUserFromOrg', removeUserFromOrg);
Router.get('/viewUsersInOrg/:id', viewUsersInOrg);

module.exports = Router;