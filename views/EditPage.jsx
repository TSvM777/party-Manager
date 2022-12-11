const React = require('react');
const Layout = require('./Layout');

function EditPage({user, party, message}) {
  const date = party.date.toLocaleDateString().split('.').reverse().join('-')
return (
<Layout user = {user}>
{user?(
  <>
  <a href='/'><button className="btn btn-outline" id='btnForTusa'>Вернуться на главную</button></a>
  <div className="wrapper">
    <div className='wrapperCreate'>
      <h2>Тусовка</h2>
      <p>{message}</p>
      <form action={`/profile/edit/${party.id}`} method='POST'>
        <div className='wrapperParty'>
          <div className="formForInput">
            <label className="form-label">Название</label>
            <input type="text" name="title" className="form-control" value={party.title} required />
          </div>
          <div className="formForInput">
          <div className='ryad'>
              <label className="form-label">Инвайт-код*</label>
              <button data-generateCode='generateCode' className='btn btn-outline' style={{border:'none'}}>сгенерировать</button>
            </div>
            <input type="text" name="code" className="form-control inputCode" value={party.code} required />
          </div>
          <div className="formForInput">
            <label className="form-label">Дата</label>
            <input type="date" name="date" className="form-control" id='inputForDate' value={date} required />
          </div>
          <div className="formForInput">
            <label className="form-label">Дресс-код</label>
            <input type="text" name="clothes" className="form-control" value={party.clothes} required />
          </div>
          <div className="formForInput">
            <div className='ryad'>
              <label className="form-label">Геопозиция</label>
              <a href='' className='mapForCreate' data-map>Узнать координаты</a>
              <div className='map' id='map'></div>
            </div>
            <input type="text" name="place" pattern='[0-9]{2}.[0-9]{6},[0-9]{2}.[0-9]{6}' className="form-control" value={party.place.replace(/, /, ',')} required />
          </div>
          <div className="formForInput">
            <label className="form-label">Жми скорей</label>
            <button type="submit" className="btn btn-outline">Редактировать</button>
          </div>
        </div>
      </form>
    </div>
  </div>
  </>
  ):
  (
  <div className='divZagolovok'>
    <h1 className='zagolovok'>Вы еще пока не можете создать тусовку... <a href="/auth/signup">зарегестрируйся</a> или <a
        href="/auth/signin">авторизуйся</a>.</h1>
  </div>
  )}
</Layout>
);
}

module.exports = EditPage;