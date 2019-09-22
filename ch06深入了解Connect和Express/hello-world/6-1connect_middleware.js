// 代码清单 6-1 使用多个 Connect 中间件
const connect = require('connect');

// 输出 HTTP 请求的方法和 URL 并调用 next()
function logger (req, res, next) {
  console.log('%s %s', req.method, req.url);
  next();
}

// 用 "hello world" 响应 HTTP 请求
function hello (req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.end('hello world');
}

// 支持方法链
connect()
  .use(logger)
  .use(hello)
  .listen(3000);

// 不使用方法链也可以
// const app = connect();
// app.use(logger);
// app.use(hello);
// app.listen(3000);
