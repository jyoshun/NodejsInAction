// 代码清单 5-2 基本的hapi服务器
const Hapi = require('hapi');
const server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: 8000
});

server.start((err) => {
  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info.url);
});
