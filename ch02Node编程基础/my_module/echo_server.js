// 代码清单 2-9 用on方法响应事件
const net = require('net');
const server = net.createServer(socket => {
  socket.on('data', data => {
    socket.write(data);
  });
});
server.listen(8888);
