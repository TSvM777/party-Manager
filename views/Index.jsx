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
        <h2>Инвайт код:</h2>
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
        <h1 id='titleH'><a href={`/party/${el['Party.id']}`}>{el['Party.title']}</a></h1>
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
  <div className='divForMainPage'>
    <div>
      <h1 className='hForMainPage'>PARTY MANAGER<p className='pForMainPage'>aka. ПАТИ МАНАГЕР</p></h1>
    </div>
    <div>
      <h2>Приложение, которое всегда поможет вам, наконец-то узнать, КТО КОМУ и СКОЛЬКО</h2>
      <ul>
        <li>Забываешь постоянно, куда и кто тебя пригласил?</li>
        <li>Устал всем говорить когда и где твоя вечеринка?</li>
        <li>Задолбался после тусовки считать сколько тебе должен Петя за пиво?</li>
      </ul>
      <h3>Если ты узнал себя, то <a href="/signup">пройди регистрацию</a>, и наконец-то отдохни!</h3>
    </div>
  </div>
  )}
</Layout>
);
}

module.exports = Index;