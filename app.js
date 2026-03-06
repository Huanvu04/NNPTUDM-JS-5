var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var rolesRouter = require('./routes/roles');
var usersRouter = require('./routes/users');
let mongoose = require('mongoose')


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/roles', rolesRouter);
app.use('/users', usersRouter);

//domain:port/api/v1/products
//domain:port/api/v1/users
//domain:port/api/v1/categories
//domain:port/api/v1/roles



mongoose.connect('mongodb://localhost:27017/JS-Bai5');
mongoose.connection.on('connected', function () {
  console.log("connected");
})
mongoose.connection.on('disconnected', function () {
  console.log("disconnected");
})

app.use('/', require('./routes/index'));
app.use('/api/v1/users', require('./routes/users'));
app.use('/api/v1/products', require('./routes/products'))
app.use('/api/v1/categories', require('./routes/categories'))
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
}); 

// error handler
app.use(function(err, req, res, next) {

  res.status(err.status || 500);
  
  // Trả về JSON 
  res.json({
      status: "error",
      message: err.message,
      // Chỉ hiện chi tiết lỗi nếu đang code (development)
      error: req.app.get('env') === 'development' ? err : {} 
  });
});

module.exports = app;
