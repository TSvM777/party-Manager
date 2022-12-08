const React = require('react');
const Layout = require('./Layout');

function AddDebtor({user, party, zakup}) {
return (
<Layout user={user}>
  {user?(
  <div>
    <h1>Добрый день, {user.name}!</h1>
    <h2>Отметь то, на что будешь скидываться</h2>
    <div className='infoAboutParty'>
      <div className='listOfFunctions'>
        <button className="btn btn-outline"><a href={`/party/${party.id}`}>Вернуться назад</a> </button> </div>
         <form
            action={`/party/adddebtor/${party.id}`} method='POST'>
            <div className='cartOfZakup'>
              <div className="formForInput">
                <label className="form-label">Выбери</label>
                <select name='item' id="">
                  {zakup && zakup.map((el)=>
                  <option value={el.id}>{el.item}</option>)}
                </select>
              </div>
              <div className="formForInput">
                <button type="submit" className="btn btn-outline">Создать</button>
              </div>
            </div>
            </form>
            <h2 className='calculatorH'>Жми на <a href={`/party/itogo/${party.id}`}>калькулятор</a>, чтобы узнать затраты</h2>
            <a href={`/party/itogo/${party.id}`}> <img className='calculatorImage' src="/images/calculator.png" alt="" />
          </a>
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

module.exports = AddDebtor;