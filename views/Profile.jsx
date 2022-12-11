const React = require('react');
const Layout = require('./Layout');

function Profile({user,parties}) {
return (
<Layout user={user}>
  {user?(
  <div>
    <a href='/'><button className="btn btn-outline" id='btnForTusa'>Вернуться на главную</button></a>
    <h2>Ниже представлен список всех ваших ближайших мероприятий</h2>
    <div class="table-responsive">
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
          <td>{el['Party.date'].toLocaleDateString()}</td>
          {user.id===el['Party.user_id']?(
          <td>{el['Party.code']}</td>
          ):(
          <td>Не доступно</td>
          )}
          {user.id===el['Party.user_id']?(
          <td id='btnForTable'>
            <a href={`/profile/edit/${el['Party.id']}`}> <button className="btn btn-outline">Редактировать</button>
            </a>
            <button id='tdFix' className="btn btn-outline" data-delete={el['Party.id']}>Удалить</button>
          </td>
          ):(
          <td id='btnForTable'><button id='btnForProfile' className="btn btn-outline" data-exit={el['Party.id']}>Выйти</button></td>
          )}
        </tr>
        )}
      </tbody>
    </table>
    </div>
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