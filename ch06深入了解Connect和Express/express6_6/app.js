// 代码清单 6-6 生成的 Express 程序框架
var createError = require('http-errors');
var express = require('express');
var path = require('path');
// 提供默认的 favicon
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var entries = require('./routes/entries');

var validate = require('./middleware/validate');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// json spaces 配置
app.set('json spaces', 2);

// 输出有颜色区分的日志, 以便于开发调试
app.use(logger('dev'));
// 解析请求主体
app.use(express.json());
// 扩展的消息体解析器
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// 提供 ./public 下的静态文件
app.use(express.static(path.join(__dirname, 'public')));

// 指定程序的路由
app.get('/', entries.list);
// app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/post', entries.form);
// 构建灵活的检验中间件
app.post('/post',
         validate.required('entry[title]'),
         validate.lengthAbove('entry[title]', 4),
         entries.submit);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  // 在开发时显示样式化的 HTML 错误页面
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
