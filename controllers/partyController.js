//подключение отрисовки страницы
const render = require('../lib/render');

//подключение вьюшек
const CreateParty = require('../views/CreateParty');
const Index = require('../views/Index');

//подключение моделей
const { User, Party, UserParty } = require('../db/models')

exports.renderCreateParty = async (req, res) => {
  const {user} = req.session
  render(CreateParty, {user}, res)
}

exports.createParty = async (req, res) => {
  const { title, code, date, clothes, place } = req.body
  const {user} = req.session
  try {
    const party = await Party.create({title, code, date, clothes, place:place.replace(/,/, ', '), user_id:user.id})
    const temp = await UserParty.create({user_id:user.id, party_id:party.id})
    res.redirect('/')
  } catch (error) {
    if(error.name === 'SequelizeUniqueConstraintError'){
      message = 'Код содержит недопустимое значение, придумайте новый код'
    }
    render(CreateParty, {user, message}, res)
  }
}

exports.addUserToParty = async (req, res) => {
  const {code} = req.body
  const {user} = req.session
  const parties = await UserParty.findAll({include: Party, where: {user_id:user.id}, raw:true})
  parties.sort((a, b) => a['Party.date']-b['Party.date'] )
  try {
    const party = await Party.findOne({where: {code}})
    console.log('party', party)
    if(party){
    const temp = await UserParty.findAndCountAll({where:{user_id:user.id, party_id:party.id}})
      if(temp.count === 0){
        const temp = await UserParty.create({user_id:user.id, party_id:party.id})
        res.redirect('/')
      } else {
        let error = new Error()
        error.message = 'Вы уже состоите в данной тусовке'
        throw error
    }
    } else {
      let error = new Error()
      error.message = 'Некорректный инвайт код.'
      throw error
    }
  } catch (error) {
    console.log(error.message)
    render(Index, {user, error, parties}, res)
  }
}
