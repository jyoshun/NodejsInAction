// 代码清单 2-2 引入一个模块
// ES5: const currency = require('./currency');
const currency = require('./currency');
console.log('50 Canadian dollars equals this amount of US dollars:');
console.log(currency.canadianToUS(50));
console.log('30 US dollars equals this amount of Canadian dollars');
console.log(currency.USToCanadian(30));
