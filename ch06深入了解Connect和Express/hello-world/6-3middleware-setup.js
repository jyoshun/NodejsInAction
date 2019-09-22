// 代码清单 6-3 可配置的 Connect 中间件 logger

// setup 函数可以用不同的配置调用多次
function setup (format) {
  // logger 组件用正则表达式匹配请求属性
  const regexp = /:(\w+)/g;
  
  // Connect 使用的真实 logger 组件
  return function createLogger (req, res, next) {
    // 用正则表达式格式化请求的日志条目
    const str = format.replace(regexp, (match, property) => {
      return req[property];
    });
    // 将日志条目输出到控制台
    console.log(str);
    // 将控制权交给下一个中间件组件
    next();
  }
}

// 直接导出 logger 的 setup 函数
module.exports = setup;

// 使用方式：传入一个字符串, 指明请求对象中的属性
// 比如：.use(setup(':method :url')) 会输出所有请求的 HTTP 方法(GET、POST等)和 URL
