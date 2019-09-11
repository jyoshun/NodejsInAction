// 代码清单 5-1 Koa的中间件顺序
const koa = require('koa');
const app = koa();

// 在中间件上使用生成器语法
app.use(function *(next) {
  const start = new Date;
  yield next;
  // yield以运行下一个中间件组件
  const ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

app.use(function *() {
  // 回到当初yield的位置继续执行
  this.body = 'Hello World';
});

app.listen(3000);
