const React = require('react');

function Layout({user, children}) {
return (
<html lang='en'>

<head>
  <meta charSet='UTF-8' />
  <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
  <meta name='viewport' content='width=device-width, initial-scale=1.0' />
  <title>Моя вечеринка
  </title>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=Alumni+Sans:wght@500&display=swap" rel="stylesheet"/>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
  </link>
  <link rel="stylesheet" href="/css/style.css" />
  <script defer src="https://api-maps.yandex.ru/2.1/?apikey=1d191576-f1f9-4ed0-8eb1-ba8f2d9c7642&lang=ru_RU" type="text/javascript"></script>

  <script defer src="/js/application.js"></script>
</head>
<body>
  <div className='wrapperMain'>
    {user?(
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <h2><a className="navbar-brand" href="/">Ваши тусы</a></h2>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Переключатель навигации">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/createParty">Создать</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href={`/profile/${user.id}`}>{user.name}</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/auth/logout">Выход</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    ):
    (<nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">О сайте</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Переключатель навигации">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/auth/signup">Регистрация</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/auth/signin">Вход</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    )}
    <div className='container'>{children}</div>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous">
  </script>
</body>

</html>
);
}

module.exports = Layout;