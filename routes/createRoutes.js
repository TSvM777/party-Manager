const express = require('express');
const route = express.Router();
const {
  renderCreateParty,
  createParty,
  addUserToParty
} = require('../controllers/partyController')

route.get('/', renderCreateParty)
route.post('/addNew', createParty)
route.post('/addUser', addUserToParty)
module.exports = route;