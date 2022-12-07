const React = require('react');

function Layout({title, children}) {
  return (
    <html lang='en'>
      <head>
        <meta charSet='UTF-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>{title ? title : 'ReactSSR'}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Alegreya+Sans+SC:wght@100&display=swap" rel="stylesheet"/>
        <link rel="stylesheet" href="/css/style.css"/>
        <script defer src="/js/application.js"></script>
      </head>
      <body>
        
        <div className='container'>{children}</div>
      </body>
    </html>
  );
}

module.exports = Layout;
