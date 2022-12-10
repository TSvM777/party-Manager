const React = require('react');
const Layout = require('./Layout');

function TusaPage({user, party, people, peoples, glava}) {
return (
<Layout user={user}>
  {user?(
    peoples.length>0?(
    <>
    <a href='/'><button className="btn btn-outline" id='btnForTusa'>Вернуться на главную</button></a>
  <div>
    <h1>Добрый день, {user.name}!</h1>
    <h2>Здесь ты можешь воспользоваться всем функционалом нашего приложения</h2>
    <div className='infoAboutParty'>
      <div className='listOfFunctions'>
        <a href={`/party/addproduct/${party.id}`}><button className="btn btn-outline" id='btnForTusa'>Твои затраты</button></a>
        <a href={`/party/adddebtor/${party.id}`}><button id='btnForTusa' className="btn btn-outline">Хочешь скинуться?</button></a>
        {user.id === party.user_id?(
        <>
          <a href={`/party/spisok/${party.id}`}><button className="btn btn-outline" id='btnForTusa'>Список участников</button></a>
          <a href={`/profile/edit/${party.id}`}> <button className="btn btn-outline" id='btnForTusa'>Редактировать</button></a>
          <a href={`/profile/${user.id}`}> <button className="btn btn-outline" id='btnForTusa'>Удалить</button></a>
        </>
        ):(
        <></>
        )}
      </div>
      <div className='listOfPartyInfo'>
        
          <h1><a href={`/party/${party.id}`}>{party.title} </a> </h1>
          <div className='cart'>
          <h3 className='textOfCart'>Владелец тусовки</h3>
          <p className='dateOfParty'>{glava['User.name']}</p>
        </div>
           <div className='cart'>
              <h3 className='textOfCart'>Где?</h3>
              <a data-map={party.id} className='map1'>{party.place}</a>
              <div id={party.id} className='map'></div>
        </div>
        <div className='cart'>
          <h3 className='textOfCart'>Когда?</h3>
          <p className='dateOfParty' href="">{party.date.toLocaleDateString()}</p>
        </div>
        <div className='cart'>
          <h3 className='textOfCart'>В чем?</h3>
          <p className='dateOfParty'>{party.clothes}</p>
        </div>
        <div className='cart'>
          <h3 className='textOfCart'>Количество участников</h3>
          <p  data-count={party.id} className='dateOfParty'>{people.count}</p>
        </div>
        {user.id===(party.user_id)?(
        <div className='cart straincher'>
          <h3 className='textOfCart'>Инвайт*</h3>
          <p className='dateOfParty'>{party.code}</p>
        </div>
        ):(
        <></>
        )}
    </div>
    </div>
    <h2 className='calculatorH'>Жми на <a href={`/party/itogo/${party.id}`}>калькулятор</a>, чтобы узнать затраты</h2>
    <a href={`/party/itogo/${party.id}`}><img className='calculatorImage' src="/images/calculator.png" alt="" /></a>
  </div>

    </>
    ):(
      <>
        <a href='/'><button className="btn btn-outline" id='btnForTusa'>Вернуться на главную</button></a>
      <div className='divZagolovok'>
      <h1 className='zagolovok'>У тебя нет доступа к этой тусовке.</h1>
    </div>
    </>
    )
  ):(
  <div className='divZagolovok'>
    <h1 className='zagolovok'>Вы еще пока не можете смореть тусовки... <a href="/auth/signup">зарегестрируйся</a> или <a
        href="/auth/signin">авторизуйся</a>.</h1>
  </div>
  )}
</Layout>
);
}

module.exports = TusaPage;