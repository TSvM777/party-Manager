const React = require('react');
const Layout = require('./Layout');

function Signup({user, message}) {
return (
<Layout user = {user}>
  <div className='wrapper'>
  <div className='wrapperAuth'>
    <form action="/auth/signup" method='POST'>
    <div className="mb-3">
        <label className="form-label">Имя пользователя</label>
        <input type="text" name="name" className="form-control" required/>
        <div className="form-text">Пишите настоящее имя.</div>
      </div>
      <div className="mb-3">
        <label className="form-label">Адрес электронной почты</label>
        <input type="email" pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.][a-zA-Z]{2,4}" placeholder='example@example.ru' name="email" className="form-control" required/>
        <div className="form-text">Мы не будем заниматься рассылкой.</div>
      </div>
      <div className="mb-3">
        <label for="exampleInputPassword1" className="form-label">Пароль</label>
        <input type="password" name="password" className="form-control" required/>
        <div className="form-text">Никому не сообщайте пароль.</div>
      </div>
      <p>{message}</p>
      <button id='btnForAuth' type="submit" className="btn btn-outline">Регистрация</button>
    </form>
  </div>
  </div>
</Layout>
);
}

module.exports = Signup;