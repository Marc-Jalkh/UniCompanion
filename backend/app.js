var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var socketIo = require('socket.io');
  

const verifyToken = require('./controllers/authorization.js')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const loginRoute = require('./routes/login.js');
const chatRoute = require('./routes/chat.js');
const postRoute = require('./routes/post.js');
const homeRoute = require('./routes/home.js');
const forYouRoute = require('./routes/forYou.js');
const eventsRoute = require('./routes/events.js');
const financeRoute = require('./routes/finance.js');
const coursesRoute = require('./routes/courses.js');

var app = express();
const cors = require('cors')
const corsOptions = {
    origin: '*',
    credential: true,
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/login', loginRoute);

app.use(verifyToken);

app.use('/chats', chatRoute);

app.use('/users', usersRouter);

app.use('/posts', postRoute);
app.use('/home', homeRoute);
app.use('/forYou', forYouRoute);
app.use('/events', eventsRoute);
app.use('/wallet', financeRoute);
app.use('/courses', coursesRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

var io = socketIo(); // Create a new instance of Socket.IO
app.io = io; // Attach Socket.IO instance to the app object to use it later in bin/www

module.exports = app;
