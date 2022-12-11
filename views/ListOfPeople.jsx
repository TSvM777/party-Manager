const React = require('react');
const Layout = require('./Layout');

function ListOfPeople({user, users, peoples}) {
return (
<Layout user={user}>
  {user?(
    peoples?(
    <>
    <a href='/'><button className="btn btn-outline" id='btnForTusa'>Вернуться на главную</button></a>
  <div>
    <h1>Добрый день, {user.name}!</h1>
    <h2>Удаляй кого захочешь</h2>
    <div className='infoAboutParty'>
      <div className='listOfFunctions'>
        <a href={`/party/${users[0].party_id}`}><button className="btn btn-outline" id='btnForTusa'>Вернуться назад </button></a> </div>
            <div className='cartOfList'>
            <h2>Список участников</h2>
            <ol>
            {users.map((el)=>(
            <li className='box'>
              <div className='cart' id='qwer'>
                <p>{el['User.name']}</p>
                {el['User.id']===users[0].user_id?(
                <h2>Организатор</h2>
                ):(
                <button data-del={el.user_id} data-dele={users[0].party_id} className='btn btn-outline'>удалить</button>
                )}
              </div>
            </li>))}
            </ol>
            </div>
      </div>
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
      <h1 className='zagolovok'>Вы еще пока не можете смореть тусовки... <a href="/auth/signup">зарегестрируйся</a> или
        <a href="/auth/signin">авторизуйся</a>.</h1>
    </div>
    )}
</Layout>
);
}

module.exports = ListOfPeople;