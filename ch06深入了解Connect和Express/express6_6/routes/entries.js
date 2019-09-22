// 代码清单 6-11 消息列表
const Entry = require('../models/entry');
exports.list = (req, res, next) => {
  // 获取消息
  Entry.getRange(0, -1, (err, entries) => {
    if (err) return next(err);
    // 渲染 HTTP 响应
    res.render('entries', {
      title: 'Entries',
      entries: entries,
    });
  });
};

exports.form = (req, res) => {
  res.render('post', { title: 'Post' });
};

// 代码清单 6-10 用表单提交的数据创建消息
exports.submit = (req, res, next) => {
  // 来自表单中名为 "entry[...]" 的控件
  const data = req.body.entry;
  // 加载用户数据的中间件在代码清单 6-28 中
  const user = req.body.user;
  const username = user ? user.name : null;
  const entry = new Entry({
    username: username,
    title: data.title,
    body: data.body
  });
  entry.save((err) => {
    if (err) return next(err);
    res.redirect('/');
  });
};
