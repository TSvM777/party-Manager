const React = require('react');
const Layout = require('./Layout');

function Profile({user,parties}) {
const date = new Date(Date.now()).toLocaleDateString()
return (
<Layout user={user}>
  {user?(
  <div>
    <h1>Добрый день, {user.name}!</h1>
    <h2>Ниже представлен список всех ваших ближайших мероприятий</h2>
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Название</th>
          <th scope="col">Место</th>
          <th scope="col">Дата</th>
          <th scope="col">Код</th>
          <th scope="col">Доп. функции</th>
        </tr>
      </thead>
      <tbody>
        {parties.map((el)=>
        <tr className='box'>
          <td><h3><a href={`/party/${el['Party.id']}`}>{el['Party.title']}</a></h3></td>
          <td>
            <div className='cart'>
              <a data-map={el['Party.id']} className='map1'>{el['Party.place']}</a>
              <div id={el['Party.id']} className='map'></div>
            </div>
          </td>
          {new Date(date)>new Date(el['Party.date'].toLocaleDateString())?(
          <td className="table-danger">{el['Party.date'].toLocaleDateString()}</td>
          ):(
          <td className="table-success">{el['Party.date'].toLocaleDateString()}</td>
          )}

          {user.id===el['Party.user_id']?(
          <td>{el['Party.code']}</td>
          ):(
          <td>Не доступно</td>
          )}
          {user.id===el['Party.user_id']?(
          <td>
            <a href={`/profile/edit/${el['Party.id']}`}> <button className="btn btn-outline">Редактировать</button>
            </a>
            <button className="btn btn-outline" data-delete={el['Party.id']}>Удалить</button>
          </td>
          ):(
          <td><button className="btn btn-outline" data-exit={el['Party.id']}>Выйти</button></td>
          )}
        </tr>
        )}
      </tbody>
    </table>
  </div>
  ):
  (
  <div className='divZagolovok'>
    <h1 className='zagolovok'>Вы еще пока не можете смореть профиль... <a href="/auth/signup">зарегестрируйся</a> или <a
        href="/auth/signin">авторизуйся</a>.</h1>
  </div>
  )}
</Layout>
);
}

module.exports = Profile;