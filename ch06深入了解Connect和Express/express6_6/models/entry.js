// 代码清单 6-7 消息条目模板
const redis = require('redis');
// 创建 Redis
const db = redis.createClient();

class Entry {
  constructor (obj) {
    // 循环遍历传入对象中的键
    for (let key in obj) {
      // 合并值
      this[key] = obj[key];
    }
  }

  save (cb) {
    // 将保存的消息转换成 JSON 字符串
    const entryJSON = JSON.stringify(this);
    // 将 JSON 字符串保存到 Redis 列表中
    db.lpush(
      'entries',
      entryJSON,
      (err) => {
        if (err) return cb(err);
        cb();
      }
    );
  }

  // 代码清单 6-8 获取一部分消息的逻辑
  static getRange (from, to, cb) {
    // 用来获取消息记录的 Redis lrange 函数
    db.lrange('entries', from, to, (err, items) => {
      if (err) return cb(err);
      let entries = [];
      items.forEach((item) => {
        // 解码之前保存为 JSON 的消息记录
        entries.push(JSON.parse(item));
      });
      cb(null, entries);
    });
  }
}

module.exports = Entry;
