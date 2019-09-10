// 代码清单 2-16 用社区贡献的工具实现串行化控制
const async = require('async');
async.series([
  callback => {
    setTimeout(() => {
      console.log('I execute first.');
      callback();
    }, 1000);
  },
  callback => {
    setTimeout(() => {
      console.log('I execute next.');
      callback();
    }, 500);
  },
  callback => {
    setTimeout(() => {
      console.log('I execute last.');
      callback();
    }, 100);
  }
]);
