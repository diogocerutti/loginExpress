/*
  INTEGRIDADE 
*/

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

const loginRouter = require('./routes/login');
const passport = require('passport');
const session = require('express-session');

function authenticationMiddleware(req, res, next) { 
  if (req.isAuthenticated()) return next();
  res.redirect('/login?fail=true'); // Verifica se o usuário já está autenticado
}

require('./auth')(passport);

app.use(session({  
  secret: '123',// "Segredo" do framework express,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 30 * 60 * 1000 }// Duração do cookie de sessão (30 minutos)
}))
app.use(passport.initialize());
app.use(passport.session());

// Setup da engine das views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Rotas
app.use('/login', loginRouter);
app.use('/users', authenticationMiddleware, usersRouter);
app.use('/', authenticationMiddleware,  indexRouter);

// Caso de erro 404
app.use(function(req, res, next) {
  next(createError(404));
});

// Manipulador de erros (error handler)
app.use(function(err, req, res, next) {
  // Seta os locals, deixando que erros apenas aconteçam em desenvolvimento
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Renderiza a página de error
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
