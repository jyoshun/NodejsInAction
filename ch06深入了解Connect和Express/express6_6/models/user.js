// 代码清单 6-15 开始创建用户模型
const redis = require('redis');
const bcrypt = require('bcrypt');
const db = redis.createClient(); // 创建到 Redis 的长连接

class User {
  constructor (obj) {
    for (let key in obj) { // 循环遍历传入的对象
      this[key] = obj[key]; // 设定当前类的所有属性
    }
  }

  // 代码清单 6-16 更新用户记录
  save (cb) {
    if (this.id) { // 如果设置了 ID, 则用户已经存在
      this.update(cb);
    } else {
      db.incr('user:ids', (err, id) => { // 创建唯一 ID
        if (err) return cb(err);
        this.id = id; // 设定 ID, 以便保存
        this.hashPassword((err) => { // 密码哈希
          if (err) return cb(err);
          this.update(cb); // 保存用户属性
        });
      });
    }
  }

  update (cb) {
    const id = this.id;
    db.set(`user:id:${this.name}`, id, (err) => { // 用名称索引用户 ID
      if (err) return cb(err);
      db.hmset(`user:${id}`, this, (err) => { // 用 Redis 存储当前类的属性
        cb(err);
      });
    });
  }

  // 代码清单 6-17 在用户模板汇总添加 bcrypt 加密函数
  hashPassword (cb) {
    bcrypt.genSalt(12, (err, salt) => { // 生成有12个字符的盐
      if (err) return cb(err);
      this.salt = salt; // 设定盐以便保存
      bcrypt.hash(this.pass, salt, (err, hash) => { // 生成哈希
        if (err) return cb(err);
        this.pass = hash; // 设定哈希以便保存
        cb();
      });
    });
  }

  // 代码清单 6-20 从 Redis 中取得用户数据
  static getByName (name, cb) {
    User.getId(name, (err, id) => { // 根据名称查找用户 Id
      if (err) return cb(err);
      User.get(id, cb); // 用 ID 抓取用户
    });
  }

  static getId (name, cb) {
    db.get(`user:id:${name}`, cb); // 取得由名称索引的 ID
  }

  static get (id, cb) {
    db.hgetall(`user:${id}`, (err, user) => { // 获取普通对象哈希
      if (err) return cb(err);
      cb(null, new User(user)); // 将普通对象转换成新的 User 对象
    });
  }

  // 代码清单 6-21 用户名和密码认证
  static authenticate (name, pass, cb) {
    User.getByName(name, (err, user) => { // 通过用户名查找用户
      if (err) return cb(err);
      if (!user.id) return cb(); // 用户不存在
      bcrypt.hash(pass, user.salt, (err, hash) => { // 对给出的密码做哈希处理
        if (err) return cb(err);
        if (hash === user.pass) return cb(null, user); // 匹配发现项
        cb(); // 密码无效
      });
    });
  }
}

module.exports = User; // 输出 User 类

// 代码清单 6-18 测试用户模型
// const user = new User({ name: 'Example', pass: 'test' }); // 创建新用户
// user.save((err) => {
//   if (err)  console.error(err);
//   console.log('user id %d', user.id);
// });

// 代码清单 6-19 使用 Redis 命令行工具进行查询
// redis-cli // 启动 Redis 命令行
// get user:ids // 找出最近创建的用户的 ID
// hgetall user:1 // 取出哈希表条目中的数据
// quit // 退出 Redis 命令行
