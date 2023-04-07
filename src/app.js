require("dotenv").config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var methodOverride = require('method-override');
const session = require('express-session');
const localUsers = require("./middlewares/localUsers");
var cookieCheck = require('./middlewares/cookieCheck');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products')
var usersApis = require('./routes/Apis/userApis')
var productsApis = require('./routes/APIs/productApis')
var cartApis = require('./routes/APIs/apiCart')
var app = express();
app.use(cookieParser());
app.use(methodOverride('_method'))
app.use(session({
  secret : 'jaquemate',
  resave : false,
  saveUninitialized : true
}));
app.use(cookieParser());
app.use(cookieCheck);
app.use(localUsers);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);

app.use('/api/users', usersApis);
app.use('/api/cart', cartApis)
app.use('/api/products', productsApis)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;


console.log('http://localhost:3000/');


