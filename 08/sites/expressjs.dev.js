let http = require('http');
module.exports = http.createServer(function(req, res) {
  res.end('hello from expressjs.com\n');
});