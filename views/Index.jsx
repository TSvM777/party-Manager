const e = require('express');
const React = require('react');
const Layout = require('./Layout');

function Index({user, parties, error}) {
return (
<Layout user={user}>
  {user?(
  <div className='indexWrapper'>
    <div className='divZagolovok'>
      <h1 className='zagolovok'>Ваши тусовки:</h1>
      <div className='divBlock'>
        <h2>Введи код тусовки</h2>
        <form action="/createParty/addUser" method='POST'>
          <div className='divCode'>
            <input type="text" name="code" className="form-control partyCode" required />
            <button data-code='code' type='submit' className="btn btn-outline">Добавить</button>
          </div>
        </form>
        <h3>{error?.message}</h3>
      </div>
    </div>
    <div className='partyList'>
      {parties.length?(parties.map((el)=>
      <div className='cartOfParty'>
        <h1><a href={`/party/${el['Party.id']}`}>{el['Party.title']}</a></h1>
        <div className='cart'>
          <h3 className='textOfCart'>Где?</h3>
          <a data-map={el['Party.id']} className='map1'>{el['Party.place']}</a>
          <div id={el['Party.id']} className='map'></div>
        </div>
        <div className='cart'>
          <h3 className='textOfCart'>Когда?</h3>
          <p className='dateOfParty' href="">{el['Party.date'].toLocaleDateString()}</p>
        </div>
        <div className='cart'>
          <h3 className='textOfCart'>В чем?</h3>
          <p className='dateOfParty'>{el['Party.clothes']}</p>
        </div>
        {user.id===el['Party.user_id']?(
        <div className='cart'>
          <h3 className='textOfCart'>Инвайт*</h3>
          <p className='dateOfParty'>{el['Party.code']}</p>
        </div>
        ):(
        <div className='cart'>
          <h3 className='textOfCart'>Ждем</h3>
          <p className='dateOfParty'>Тебя</p>
        </div>
        )}
      </div>
      )
      ):(
      <h2>У вас, пока нет тусовок, но вы можете... <a href="/createParty">создать свою тусовку</a> </h2>
      )}
    </div>
  </div>
  ):(
  <div></div>
  )}
</Layout>
);
}

module.exports = Index;