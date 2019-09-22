// 代码清单 6-14 检验中间件的实现

// 解析 entry[name] 符号
function parseField (field) {
  return field.split(/\[|\]/).filter((s) => s);
}

// 基于 parseField() 的结果查找属性
function getField (req, field) {
  let val = req.body;
  field.forEach((prop) => {
    val = val[prop];
  });
  return val;
}

exports.required = (field) => {
  // 解析输入域一次
  field = parseField(field);
  return (req, res, next) => {
    // 每次收到请求都检查输入域是否有值
    if (getField(req, field)) {
      // 如果有, 则进入下一个中间件
      next();
    } else {
      // 如果没有, 显示错误
      res.error(`${field.join(' ')} is required`);
      res.redirect('back');
    }
  };
};

exports.lengthAbove = (field, len) => {
  field = parseField(field);
  return (req, res, next) => {
    if (getField(req, field).length > len) {
      next();
    } else {
      const fields = field.join(' ');
      res.error(`${fields} must have more than ${len} characters`);
      res.redirect('back');
    }
  };
};
