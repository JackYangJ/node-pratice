let http = require('http');
let parse = require('url').parse;
let join = require('path').join;
let fs = require('fs');

let root = __dirname;

let server = http.createServer((req, res) => {
  let url = parse(req.url);
  let path = join(root, url.pathname);
  let stream = fs.createReadStream(path);
  stream.pipe(res);
  stream.on('error', (err) => {
    res.statusCode = 500;
    res.end('Internal Server Error');
  });
});
server.listen(3000);