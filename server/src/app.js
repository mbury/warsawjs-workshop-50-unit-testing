var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var authRouter = require('./auth/auth-route');
var carsRouter = require('./cars/cars-route');
var rentalsRouter = require('./rentals/rentals-route');

const { checkSignIn } = require('./auth/auth-middleware');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// initialize express-session to allow us track the logged-in user across sessions.
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  })
);

// This middleware will check if user's cookie is still saved in browser and
// user is not set, then automatically log the user out. This usually happens
// when you stop your express server after login, your cookie still remains
// saved in the browser.
app.use((req, res, next) => {
  if (req.cookies.sid && !req.session.userId) {
    res.clearCookie('connect.sid');
  }
  next();
});

app.use((req, res, next) => {
  if (req.session.user) {
    res.locals.user = req.session.user;
  }
  next();
});

app.use('/api/cars', checkSignIn, carsRouter);
app.use('/api/rentals', checkSignIn, rentalsRouter);
app.use('/api/auth', authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
