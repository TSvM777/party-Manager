require('dotenv').config(); 
require('@babel/register');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const app = express();

//импорт вспомогательных ф-й
const dbCheck = require('./db/dbCheck');

// импорт роутов
const indexRoutes = require('./routes/indexRoutes');
const authRoutes = require('./routes/authRoutes');
const createRoutes = require('./routes/createRoutes');
const profileRoutes = require('./routes/profileRoutes');
const partyRoutes = require('./routes/partyRoutes');

 // вызов функции проверки соединения с базоый данных
dbCheck();

app.use(express.static(path.resolve('public')));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const sessionConfig = {
  name: 'party',
  store: new FileStore(),
  secret: process.env.SECRET ?? 'mySecretPass',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 10,
    httpOnly: true,
  },
};

app.use(session(sessionConfig));

//роутеры
app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/createParty', createRoutes)
app.use('/profile', profileRoutes)
app.use('/party', partyRoutes)
app.use('*', (req, res) => {
  res.redirect('/')
})
const PORT = process.env.PORT || 3100;
app.listen(PORT, (err) => {
  if (err) return console.log('Ошибка запуска сервера.', err.message)
  console.log(`Сервер запущен на http://localhost:${PORT} `);
});
