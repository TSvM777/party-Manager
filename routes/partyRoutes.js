const express = require('express');
const route = express.Router();
const {
  renderTusaPage,
  getListOfparticipant,
  deleteUser,
  renderProductForm,
  addProduct,
  renderDebtorForm,
  addDebtor,
  getItogoForm
} = require('../controllers/tusaController')

route.get('/:id', renderTusaPage)
route.get('/spisok/:id', getListOfparticipant)
route.delete('/del/:id', deleteUser)
route.get('/addproduct/:id', renderProductForm)
route.post('/addproduct/:id', addProduct)
route.get('/adddebtor/:id', renderDebtorForm)
route.post('/adddebtor/:id', addDebtor)
route.get('/itogo/:id', getItogoForm)
module.exports = route;