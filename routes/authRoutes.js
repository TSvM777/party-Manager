const express = require('express');
const route = express.Router();
const {
  renderSignUp,
  renderSignIn,
  createUserAndSession,
  checkUserAndSession,
  deleteSession
} = require('../controllers/authController')

route.get('/signup', renderSignUp)
route.get('/signin', renderSignIn)
route.post('/signup', createUserAndSession)
route.post('/signin', checkUserAndSession)
route.get('/logout', deleteSession)
module.exports = route;