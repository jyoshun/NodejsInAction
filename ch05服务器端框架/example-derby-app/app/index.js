// 代码清单 5-5 Derby app/index.js文件
const app = module.exports = require('derby').createApp('hello', __filename);
app.loadViews(__dirname);

app.get('/', (page, model) => {
  const message = model.at('hello.message');
  message.subscribe(err => {
    if (err) return next(err);
    message.createNull('');
    page.render();
  });
});
