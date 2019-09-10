// 代码清单 2-10 用once方法响应单次事件
const net = require('net');
const server = net.createServer(socket => {
  socket.once('data', data => {
    socket.write(data);
  });
});
server.listen(8888);
