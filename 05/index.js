
// 基本的代理请求
// let http = require('http');
// let server = http.createServer((req, res) => {
//   let url = 'https://www.baidu.com/';
//   let body = '<p>Redirecting to <a href="'+ url +'">"'+ url  + '</a></p>';
//   res.setHeader('Location', url);
//   res.setHeader('Content-type', 'text/plain');
//   res.setHeader('Content-type', body.length);
//   res.statusCode = 302;
//   res.end(body);
// });
// server.listen(3000);

//代码清单4-1 curl post/put/delete/put
let http = require('http');
let url = require('url');
let items = [];

let server = http.createServer(function(req, res) {
  switch(req.method) {
    case 'POST':
      let item = '';
      req.setEncoding('utf8');
      req.on('data', function(chunk) {
        item += chunk;
      });
      console.log(item);
      console.log(items);
      req.on('end', function() {
        items.push(item);
        res.end('OK\n');
      });
      break;
    case 'GET':
      let body = items.map(function(item, i) {
        return i + ')' + item;
      }).join('\n');
      res.setHeader('Content-Length', Buffer.byteLength(body));
      res.setHeader('Content-Type', 'text/plain; charset="utf-8"');
      res.end(body);
      break;
    case 'DELETE':
      let path = url.parse(req.url).pathname;
      let i = parseInt(path.slice(1), 10);
      if (isNaN(i)) {
        res.statusCode = 400;
        res.end('Invaild item id');
      } else if (!items[i]) {
        res.statusCode = 404;
        res.end('Item not found');
      } else {
        items.splice(i, 1);
        res.end('OK\n');
      }
      break;
    case 'PUT':
      let f = '';
      let data = '';
      let putData = '';
      req.setEncoding('utf8');
      req.on('data', function(chunk) {
        console.log(chunk);
        putData = chunk.split('&');
      });
      req.on('end', function() {
        f = putData[0].split('=')[1];
        data = putData[1].split('=')[1];
        if (isNaN(f)) {
          res.statusCode = 400;
          res.end('Invaild item id');
        } else if (!items[f]) {
          res.statusCode = 404;
          res.end('Item not found');
        } else {
          items[f] = data;
          res.end('OK\n');
        }
      });
      break;
  }
});
server.listen(3000);