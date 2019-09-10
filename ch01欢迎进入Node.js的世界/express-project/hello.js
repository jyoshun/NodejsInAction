// 代码请单 1-2 用Node的http模块写的Hello World
const http = require('http');
const port = 8080;

const server = http.createServer((req, res) => {
  res.end('<h1>Hello, World.</h1>');
});

server.listen(port, () => {
  console.log('Server listening on: http://localhost:%s', port);
});
