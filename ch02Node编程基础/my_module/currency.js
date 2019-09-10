// 代码请单 2-1 定义一个Node模块
const canadianDollar = 0.91;

function roundTwo (amount) {
  return Math.round(amount * 100) / 100;
}

exports.canadianToUS = canadian => roundTwo(canadian * canadianDollar);
// export function canadianToUS (canadian) {
//   return roundTwo(canadian * canadianDollar);
// }

exports.USToCanadian = us => roundTwo(us / canadianDollar);
// export function USToCanadian (us) {
//   return roundTwo(us / canadianDollar);
// }
