const express = require('express');
const route = express.Router();
const {
  renderMainPage,
} = require('../controllers/indexController')

route.get('/', renderMainPage)

module.exports = route;
