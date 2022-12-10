//подключение отрисовки страницы
const render = require('../lib/render');

//подключение вьюшек
const Profile = require('../views/Profile');
const EditPage = require('../views/EditPage');
const { UserParty, Party } = require('../db/models')

exports.renderProfilePage = async (req, res) => {
  const {user} = req.session
  const parties = await UserParty.findAll({include: Party, where: {user_id:user.id}, raw:true})
  parties.sort((a, b) => a['Party.date']-b['Party.date'] )
  render(Profile, {user, parties}, res)
}

exports.deleteParty = async (req, res) => {
  const {user} = req.session
  const { partyId } = req.body
  try {
    const auc = await Party.destroy({where: {id:partyId, user_id:user.id}})
    res.sendStatus(200);
  } catch (error) {
    console.log(error)
  }
}

exports.exitParty = async (req, res) => {
  const {user} = req.session
  const { partyId } = req.body
  try {
    const auc = await UserParty.destroy({where: {party_id:partyId, user_id:user.id}})
    res.sendStatus(200);
  } catch (error) {
    console.log(error)
  }
}

exports.renderEditPage = async (req, res) => {
  const {user} = req.session
  const party = await Party.findOne({ where: { id: req.params.id, user_id:user.id }, raw:true });
  render(EditPage, {user, party}, res)
}

exports.editParty = async (req, res) => {
  const {user} = req.session
  const { title, code, date, clothes, place } = req.body
  const party = await Party.findOne({ where: { id: req.params.id, user_id:user.id }, raw:true });
  try {
    await Party.update(
      {
        title,
        code,
        date,
        clothes,
        place:place.replace(/,/, ', ')
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.redirect(`/profile/${user.id}`)
  } catch (error) {
    if(error.name === 'SequelizeUniqueConstraintError'){
      message = 'Код содержит недопустимое значение, придумайте новый код'
    }
    render(EditPage, {user, party, message}, res)
  }
}