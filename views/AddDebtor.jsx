const React = require('react');
const Layout = require('./Layout');

function AddDebtor({user, party, zakup, peoples}) {
  console.log(zakup)
return (
<Layout user={user}>
  {user?(
    peoples.length>0?(
     <>
     <a href='/'><button className="btn btn-outline" id='btnForTusa'>Вернуться на главную</button></a>
  <div>
    <h1>Добрый день, {user.name}!</h1>
    <h2>Отметь то, на что будешь скидываться</h2>
    <div className='infoAboutParty'>
      <div className='listOfFunctions'>
        <a href={`/party/${party.id}`}><button className="btn btn-outline" id='btnForTusa'>Вернуться назад </button></a> </div>
         <form
            action={`/party/adddebtor/${party.id}`} method='POST'>
            <div className='cartOfZakup'>
              <div className="formForInput" id="debtorInput">
                {zakup.length>0?(
                  <>
                <label className="form-label">Выбери</label>
                <select className='selectForDebtor' style={{height: '500px'}} multiple name='item'>
                  {zakup.map((el)=>
                  <option value={el.id}>{el.item} - {el['User.name']}</option>)}
                </select>
                </>
                ):(
                <>
                  <h1>У вас пока не было трат</h1>
                </>
                )}
              </div>
              {zakup.length>0?(
              <div className="formForInput" id="debtorBtn">
                <button type="submit" className="btn btn-outline">Создать</button>
              </div>
              ):(
                <></>
              )}
            </div>
            </form>
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

module.exports = AddDebtor;