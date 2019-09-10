// 代码清单 3-3 模型类 Article
const sqlite3 = require('sqlite3').verbose();
const dbName = 'later.sqlite';
const db = new sqlite3.Database(dbName);

db.serialize(() => {
  const sql = `
    CREATE TABLE IF NOT EXISTS articles (
      id INTEGER PRIMARY KEY,
      title TEXT,
      content TEXT
    )
  `;
  db.run(sql);
});

class Article {
  // 获取所有文章
  static all(cb) {
    db.all('SELECT * FROM articles', cb);
  }

  // 给定ID，选择一篇指定的文章
  static find(id, cb) {
    db.get('SELECT * FROM articles WHERE id = ?', id, cb);
  }

  // 创建一篇有标题和内容的文章
  static create(data, cb) {
    const sql = 'INSERT INTO articles(title, content) VALUES(?, ?)';
    db.run(sql, data.title, data.content, cb);
  }

  // 根据ID删除文章
  static delete(id, cb) {
    if (!id) return cb(new Error('Please provide an id'));
    db.run('DELETE FROM articles WHERE id = ?', id, cb);
  }
}

module.exports = db;
module.exports.Article = Article;
