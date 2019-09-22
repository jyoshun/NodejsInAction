// 代码清单 6-5 极简的 Express 程序
const express = require('express');
const app = express();

// 响应对 / 的请求
app.get('/', (req, res) => {
  // 发送 "Hello" 作为响应文本
  res.send('Hello');
});

// 监听端口
app.listen(3000);
