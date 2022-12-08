const express = require('express');
const route = express.Router();

const {
  renderProfilePage,
  deleteParty,
  exitParty,
  renderEditPage,
  editParty
} = require('../controllers/profileController')

route.get('/:id', renderProfilePage)
route.delete('/delete/:id', deleteParty)
route.delete('/exit/:id', exitParty)
route.get('/edit/:id', renderEditPage)
route.post('/edit/:id', editParty)

module.exports = route;
