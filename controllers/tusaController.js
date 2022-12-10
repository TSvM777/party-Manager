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
    const peoples = await UserParty.findAll({where: {user_id:user.id, party_id:req.params.id}})
    const glava = await Party.findOne({include: User, where: {id:req.params.id}, raw:true})
    render(TusaPage, {user, party, people, peoples, glava}, res)
  } catch (error) {
    console.log(error)
  }
}

exports.renderProductForm = async (req, res) => {
  const {user} = req.session
  const peoples = await UserParty.findAll({where: {user_id:user.id, party_id:req.params.id}})
  const party = await Party.findOne({where: {id: req.params.id}})
  render(AddProduct, {user, party, peoples}, res)
}

exports.renderDebtorForm = async (req, res) => {
  const {user} = req.session
  const party = await Party.findOne({where: {id: req.params.id}})
  const zakup = await Zakup.findAll({include: User, where: {party_id:req.params.id}, raw:true})
  const peoples = await UserParty.findAll({where: {user_id:user.id, party_id:req.params.id}})
  render(AddDebtor, {user, party, zakup, peoples}, res)
}

exports.getItogoForm = async (req, res) => {
  const {user} = req.session
  const {id} = req.params
  const party = await Party.findOne({where: {id}})
  const zakups = await Zakup.findAll({include: User, where: {party_id:id}, raw:true})
  const peoples = await UserParty.findAll({where: {user_id:user.id, party_id:req.params.id}})
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
  render(Table, {user, party, zakups, debtor, peoples}, res)
}

exports.getListOfparticipant = async (req, res) => {
  const {id} = req.params
  const {user} = req.session
  try {
    const users = await UserParty.findAll({include: User, where: {party_id:id}, raw:true})
    const peoples = await Party.findOne({where: {user_id:user.id, id}})
    render(ListOfPeople, {user, users, peoples}, res)
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
  res.redirect(`/party/addproduct/${id}`)
  } catch (error) {
    console.log(error)
  }
}

exports.addDebtor = async (req, res) => {
  console.log(req.body)
  const {user} = req.session
  const {id} = req.params
  const {item} = req.body
  console.log('item', item)
  try {
    if(typeof item === 'string'){
      const debtor = await Debtor.findOrCreate({where: {user_id:user.id, zakup_id:item}, raw:true})
      if(debtor[1]===false){ 
        res.redirect(`/party/${id}`)
      }else {
    let count = await Debtor.findAndCountAll({where:{zakup_id:item}})
    const zakup = await Zakup.findOne({where: {id:item}})
    let result
    if(count.count === 1) {result = zakup.sum}
    else {result = zakup.sum*(count.count-1)/(count.count)}
    const updateSum = await Zakup.update({sum:result.toFixed()}, {where: {id:item}})}
    res.redirect(`/party/${id}`)
    } 
    else 
    {
    for(let i = 0; i < item.length; i++){
    const debtor = await Debtor.findOrCreate({where: {user_id:user.id, zakup_id:+item[i]}, raw:true})
    if(debtor[1]===false){ 
      continue
    }
    else{
    let count = await Debtor.findAndCountAll({where:{zakup_id:item[i]}})
    const zakup = await Zakup.findOne({where: {id:item[i]}})
    let result
    if(count.count === 1) {result = zakup.sum}
    else {result = zakup.sum*(count.count-1)/(count.count)}
    const updateSum = await Zakup.update({sum:result.toFixed()}, {where: {id:item[i]}})
    }}
  res.redirect(`/party/${id}`)
}
  } catch (error) {
    console.log(error)
  }
}