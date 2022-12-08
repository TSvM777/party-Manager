const React = require('react');
const Layout = require('./Layout');

function Table({user, party, zakups, debtor}) {
  console.log(debtor)
return (
<Layout user={user}>
  {user?(
  <div>
    <h1>Добрый день, {user.name}!</h1>
    <h2>Таблица, которая облегчит тебе жизнь</h2>
    <div className='infoAboutParty'>
      <div className='listOfFunctions'>
        <button className="btn btn-outline"><a href={`/party/${party.id}`}>Вернуться назад</a> </button> </div> <div className='divTable'>
            <div className='tableForFinal'>
              <table class="table table-bordered border border-secondary">
                <thead>
                  <tr>
                    <th scope="col">Кто?</th>
                    <th scope="col">Кому?</th>
                    <th scope="col">Сколько?</th>
                    <th scope="col">За что?</th>
                  </tr>
                </thead>
                <tbody class="table-group-divider">
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