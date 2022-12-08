//подключение отрисовки страницы
const render = require('../lib/render');

//подключение вьюшек
const Index = require('../views/Index')

//подключение моделей
const { Party, UserParty } = require('../db/models')

exports.renderMainPage = async (req, res) => {
  const {user} = req.session
  try {
    if(user){
      const parties = await UserParty.findAll({include: Party, where: {user_id:user.id}, raw:true})
      parties.sort((a, b) => a['Party.date']-b['Party.date'] )
      render(Index, {user, parties}, res)
    } else { render(Index, {user}, res) } 
  } catch (error) {
    console.log(error)
  }
}
