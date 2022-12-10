const React = require('react');
const Layout = require('./Layout');

function Signin({user, error}) {
return (
<Layout user = {user}>
<div className='wrapper'>
  <div className='wrapperAuth'>
    <form action="/auth/signin" method='POST'>
      <div className="mb-3">
        <label className="form-label">Адрес электронной почты</label>
        <input type="email" name="email" placeholder='example@example.ru' className="form-control" required/>
      </div>
      <div className="mb-3">
        <label for="exampleInputPassword1" className="form-label">Пароль</label>
        <input type="password" name="password" className="form-control" required/>
        <div className="form-text">Никому не сообщайте пароль.</div>
      </div>
      <p>{error?.message}</p>
      <button id='btnForAuth' type="submit" className="btn btn-outline">Войти</button>
    </form>
  </div>
  </div>
</Layout>
);
}

module.exports = Signin;