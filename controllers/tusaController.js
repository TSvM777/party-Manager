//подключение отрисовки страницы
const render = require('../lib/render');

//подключение вьюшек
const TusaPage = require('../views/TusaPage');
const ListOfPeople = require('../views/ListOfPeople');
const AddProduct = require('../views/AddProduct')
const AddDebtor = require('../views/AddDebtor')
const Table = require('../views/Table')
//подключение моделей
const { User, Party, UserParty, Zakup, Debtor } = require('../db/models')

exports.renderTusaPage = async (req, res) => {
  const {user} = req.session
  try {
    const party = await Party.findOne({where: {id: req.params.id}})
    const people = await UserParty.findAndCountAll({where:{party_id:party.id}})
    render(TusaPage, {user, party, people}, res)
  } catch (error) {
    console.log(error)
  }
}

exports.renderProductForm = async (req, res) => {
  const {user} = req.session
  const party = await Party.findOne({where: {id: req.params.id}})
  render(AddProduct, {user, party}, res)
}

exports.renderDebtorForm = async (req, res) => {
  const {user} = req.session
  const party = await Party.findOne({where: {id: req.params.id}})
  const zakup = await Zakup.findAll({where: {party_id:req.params.id}, raw:true})
  render(AddDebtor, {user, party, zakup}, res)
}

exports.getItogoForm = async (req, res) => {
  const {user} = req.session
  const {id} = req.params
  const party = await Party.findOne({where: {id}})
  const zakups = await Zakup.findAll({include: User, where: {party_id:id}, raw:true})
  const debtor = await User.findAll({
    include: {
      model: Zakup,
      required: true,
      where:{
        party_id:id
      },
      include:{
        model: Debtor,
        required: true,
        include: {
          model: User,
          required: true,
        }
      }
    }, raw:true,
    
  })
  render(Table, {user, party, zakups, debtor}, res)
}

exports.getListOfparticipant = async (req, res) => {
  const {id} = req.params
  const {user} = req.session
  try {
    const users = await UserParty.findAll({include: User, where: {party_id:id}, raw:true})
    render(ListOfPeople, {user, users}, res)
  } catch (error) {
    console.log(error)
  }
}

exports.deleteUser = async (req, res) => {
  try {
    const del = await UserParty.destroy({where: {party_id:req.body.partyId, user_id:req.params.id}})
    res.sendStatus(200)
  } catch (error) {
    console.log(error)
  }
}

exports.addProduct = async (req, res) => {
  const {user} = req.session
  const {item, sum} = req.body
  const {id} = req.params
  try {
  const prod = await Zakup.create({item, sum, user_id:user.id, party_id:id})
  res.redirect(`/party/${id}`)
  } catch (error) {
    console.log(error)
  }
}

exports.addDebtor = async (req, res) => {
  const {user} = req.session
  const {id} = req.params
  console.log('=========================', req.body)
  const {item} = req.body
  try {
    const debtor = await Debtor.findOrCreate({where: {user_id:user.id, zakup_id:item}})
    let count = await Debtor.findAndCountAll({where:{zakup_id:item}})
    const zakup = await Zakup.findOne({where: {id:item}})
    let result
    if(count.count === 1) {result = zakup.sum}
    else {result = zakup.sum*(count.count-1)/(count.count)}
    const updateSum = await Zakup.update({sum:result.toFixed()}, {where: {id:item}})
    res.redirect(`/party/${id}`)
  } catch (error) {
    console.log(error)
  }
}