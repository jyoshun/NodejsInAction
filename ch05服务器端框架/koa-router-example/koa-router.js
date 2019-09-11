const app = require('koa')();
const router = require('koa-router')();

router
  .post('/pages', function*() {
    // 创建页面
    this.body = 'Pages';
  })
  .get('/pages/:id', function*() {
    // 渲染页面
    this.body = 'A page';
  })
  .put('pages-update', '/pages/:id', function*() {
    // 更新页面
    this.body = 'Updated page';
  });

// router.url('pages-update', '99');

app.use(router.routes());

app.listen(process.env.PORT || 3000);
