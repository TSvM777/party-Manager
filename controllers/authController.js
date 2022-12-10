//подключение bcrypt для скрытия пароля
const bcrypt = require('bcrypt');

//подключение отрисовки страницы
const render = require('../lib/render');

//подключение вьюшек
const Signin = require('../views/Signin');
const Signup = require('../views/Signup');
const { User } = require('../db/models')

exports.renderSignUp = async (req, res) => {
  const {user} = req.session
  render(Signup, {user}, res)
}

exports.createUserAndSession = async (req, res) => {
  const {name, email, password} = req.body
  const hashPassword = await bcrypt.hash(password, 5)
  try {
    const user = await User.create({name, email, password:hashPassword})
    req.session.user = {id: user.id, name:user.name, email:user.email}
    req.session.save(() => {
      res.redirect('/');
    })
  } catch (error) {
    if(error.name === 'SequelizeUniqueConstraintError'){
      message = 'Пользователь с такой почтой уже существует'
    }
    render(Signup, { message }, res);
  }
}

exports.checkUserAndSession = async (req, res) => {
  const {email, password} = req.body
  try {
    const user = await User.findOne({ where: {email}})
    console.log('user', user)
    if(user===null){
      let error = new Error()
      error.message = 'Неправильная почта или пароль.'
      throw error
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if(isPasswordValid){
      req.session.user = {id: user.id, name:user.name, email:user.email}
      req.session.save(() => {
        res.redirect('/');
      })
    }else{
      let error = new Error()
      error.message = 'Неправильная почта или пароль.'
      throw error
    }
  } catch (error) {
    console.log(error)
    render(Signin, { error }, res);
  }
}

exports.renderSignIn = async (req, res) => {
  const {user} = req.session
  render(Signin, {user}, res)
}

exports.deleteSession = async (req, res) => {
  req.session.destroy(()=> {
    res.clearCookie('party');
    res.redirect('/');
  })
}
