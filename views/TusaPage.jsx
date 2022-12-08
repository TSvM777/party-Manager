const React = require('react');
const Layout = require('./Layout');

function TusaPage({user, party, people}) {
return (
<Layout user={user}>
  {user?(
  <div>
    <h1>Добрый день, {user.name}!</h1>
    <h2>Здесь ты можешь воспользоваться всем функционалом нашего приложения</h2>
    <div className='infoAboutParty'>
      <div className='listOfFunctions'>
        <button data-alcohol className="btn btn-outline">Калькулятор алкоголя</button>
        <button data-kebab className="btn btn-outline">Калькулятор шашлыка</button>
        <button className="btn btn-outline"><a href={`/party/addproduct/${party.id}`}>Твои затраты</a></button>
        <button className="btn btn-outline"><a href={`/party/adddebtor/${party.id}`}>Хочешь скинуться?</a></button>
        {user.id === party.user_id?(
        <button className="btn btn-outline"><a href={`/party/spisok/${party.id}`}>Список участников</a></button>
        ):(
        <></>
        )}
      </div>
      <div className='listOfPartyInfo'>
        
          <h1><a href={`/party/${party.id}`}>{party.title} </a> </h1> <div className='cart'>
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