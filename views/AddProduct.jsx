const React = require('react');
const Layout = require('./Layout');

function AddProduct({user, party, peoples, message}) {
return (
<Layout user={user}>
  {user?(
    peoples.length>0?(
     <>
     <a href='/'><button className="btn btn-outline" id='btnForTusa'>Вернуться на главную</button></a>
  <div>
    <h1>Добрый день, {user.name}!</h1>
    <h2>Добавь то, что ты купил для вечеринки</h2>
    <div className='infoAboutParty'>
      <div className='listOfFunctions'>
        <a href={`/party/${party.id}`}><button className="btn btn-outline" id='btnForTusa'>Вернуться назад </button></a> </div> <form
            action={`/party/addproduct/${party.id}`} method='POST'>
            <div className='cartOfZakup'>
              <div className="formForInput1">
                <label className="form-label">Что купил?</label>
                <input type="text" name="item" className="form-control" required />
              </div>
              <div className="formForInput1">
                <label className="form-label">Сумма</label>
                <input type="text" pattern='[0-9]{1,}' name="sum" className="form-control" required />
                <div className="form-text">Укажите сумму в рублях.</div>
              </div>
              <div className="formForInput1">
                <button type="submit" className="btn btn-outline">Создать</button>
              </div>
            </div>
            </form>
            <h2 className='calculatorH'>Жми на <a href={`/party/itogo/${party.id}`}>калькулятор</a>, чтобы узнать затраты</h2>
            <a href={`/party/itogo/${party.id}`}> <img className='calculatorImage' src="/images/calculator.png" alt="" />
          </a>
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

module.exports = AddProduct;