// 代码清单 6-2 错误：hello 中间件组件在 logger 组件前面
const connect = require('connect');

// 总是调用 next(), 所以后续中间件总会被调用
function logger (req, res, next) {
  console.log('%s %s', req.method, req.url);
  next();
}

// 不会调用 next(), 因为组件响应了请求
function hello (req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.end('hello world');
}

// 因为 hello 不调用 next(), 所以 logger 永远不会被调用
connect()
  .use(hello)
  .use(logger)
  .listen(3000);
