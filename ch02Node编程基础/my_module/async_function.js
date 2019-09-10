// 代码清单 2-15 用匿名函数保留全局变量的值
function asyncFunction (callback) {
  setTimeout(callback, 200);
}

let color = 'blue';

(color => {
  asyncFunction(() => {
    console.log('The color is', color);
  });
})(color);

color = 'green';
