const React = require('react');
const Layout = require('./Layout');

function EditPage({user, party}) {
  const date = party.date.toLocaleDateString().split('.').reverse().join('-')
return (
<Layout user = {user}>
{user?(
  <div className="wrapper">
    <div className='wrapperCreate'>
      <h2>Тусовка</h2>
      <form action={`/profile/edit/${party.id}`} method='POST'>
        <div className='wrapperParty'>
          <div className="formForInput">
            <label className="form-label">Название</label>
            <input type="text" name="title" className="form-control" value={party.title} required />
          </div>
          <div className="formForInput">
            <div className='divZagolovok'>
              <label className="form-label">Инвайт-код*</label>
              <button data-generateCode='generateCode' className='btn btn-outline' style={{border:'none'}}>сгенерировать</button>
            </div>
            <input type="text" name="code" className="form-control inputCode" value={party.code} required />
          </div>
          <div className="formForInput">
            <label className="form-label">Дата</label>
            <input type="date" name="date" className="form-control" value={date} required />
          </div>
          <div className="formForInput">
            <label className="form-label">Дресс-код</label>
            <input type="text" name="clothes" className="form-control" value={party.clothes} required />
          </div>
          <div className="formForInput">
            <label className="form-label">Геопозиция</label>
            <input type="text" name="place" className="form-control"  value={party.place} required />
          </div>
          <div className="formForInput">
            <label className="form-label">Жми скорей</label>
            <button type="submit" className="btn btn-outline">Редактировать</button>
          </div>
        </div>
      </form>
    </div>
  </div>
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