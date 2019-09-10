// 代码清单 2-14 作用域是如何导致bug出现的
function asyncFunction (callback) {
  setTimeout(callback, 200);
}

let color = 'blue';
asyncFunction(() => {
  console.log(`The color is ${color}`);
});
color = 'green';
