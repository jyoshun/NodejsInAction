// 代码清单 3-6 Article列表模板
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Article = require('./db').Article;
const read = require('node-readability');

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// 响应静态文件请求
app.use(
  '/css/bootstrap.css',
  express.static('node_modules/bootstrap/dist/css/bootstrap.css')
);

app.get('/articles', (req, res, next) => {
  Article.all((err, articles) => {
    if (err) return next(err);
    res.format({
      html: () => {
        res.render('articles.ejs', { articles: articles });
      },
      json: () => {
        res.send(articles);
      }
    });
  });
});

app.get('/articles/:id', (req, res, next) => {
  const id = req.params.id;
  Article.find(id, (err, article) => {
    if (err) return next(err);
    res.send(article);
  });
});

app.post('/articles', (req, res, next) => {
  // 从POST消息体中得到URL
  const url = req.body.url;

  // 用readability模块获取这个URL指向的页面
  read(url, (err, result) => {
    if (err || !result) res.status(500).send('Error downloading article');
    Article.create(
      { title: result.title, content: result.content },
      (err, article) => {
        if (err) return next(err);
        // 文章保存成功后，发送状态码为200的响应
        res.send('OK');content
      }
    );
  });
});

app.delete('/articles/:id', (req, res, next) => {
  const id = req.params.id;
  Article.delete(id, (err) => {
    if (err) return next(err);
    res.send({ message: 'Deleted' });
  });
});

app.listen(app.get('port'), () => {
  console.log('App started on port', app.get('port'));
});

module.exports = app;
