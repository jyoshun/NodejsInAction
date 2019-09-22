// 代码清单 6-4 Connect 中的错误处理中间件
const env = process.env.NODE_ENV || 'development';

// 错误处理中间件定义四个参数
function errorHandler (err, req, res, next) {
  res.statusCode = 500;
  // errorHandler 中间件组件根据 NODE_ENV 的值执行不同的操作
  switch (env) {
    case 'development':
      console.error('Error');
      console.error(err);
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(err));
      break;
    default:
      res.end('Server error');
  }
}

module.exports = errorHandler;
