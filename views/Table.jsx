const React = require('react');
const Layout = require('./Layout');

function Table({user, party, zakups, debtor, peoples}) {
return (
<Layout user={user}>
  {user?(
    peoples.length>0?(
     <>
     <a href='/'><button className="btn btn-outline" id='btnForTusa'>Вернуться на главную</button></a>
  <div>
    <h1>Добрый день, {user.name}!</h1>
    <h2>Таблица, которая облегчит тебе жизнь</h2>
    <div className='infoAboutParty'>
      <div className='listOfFunctions'>
        <a href={`/party/${party.id}`}><button className="btn btn-outline" id='btnForTusa'>Вернуться назад </button></a> </div> <div className='divTable'>
            <div className='tableForFinal'>
              <table className="table table-bordered border border-secondary">
                <thead>
                  <tr>
                    <th scope="col">Кто?</th>
                    <th scope="col">Кому?</th>
                    <th scope="col">Сколько?</th>
                    <th scope="col">За что?</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {debtor.map((el)=>(
                  <tr>
                    <td>{el['Zakups.Debtors.User.name']}</td>
                    <td>{el.name}</td>
                    <td>{el['Zakups.sum']}</td>
                    <td>{el['Zakups.item']}</td>
                  </tr>
                  ))}
                </tbody>
              </table>
            </div>
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

module.exports = Table;