var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const loginRoute = require('./routes/login.js');
const verifyToken = require('./controllers/authorization.js');
const chatRoute = require('./routes/chat.js');
const postRoute = require('./routes/post.js');
const homeRoute = require('./routes/home.js');
const forYouRoute = require('./routes/forYou.js');
const eventsRoute = require('./routes/events.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/login', loginRoute);
app.use('/chats', chatRoute);

app.use('/users', usersRouter);

app.use('/', indexRouter);


app.use(verifyToken);

app.use('/posts', postRoute);
app.use('/home', homeRoute);
app.use('/forYou', forYouRoute);
app.use('/events', eventsRoute);

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
