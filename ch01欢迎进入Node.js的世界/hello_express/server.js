// 代码清单 1-3 一个Node Web应用程序
import express from 'express'; // ES5: const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});
app.listen(3000, () => {
  console.log('Express web app on localhost:3000');
});
