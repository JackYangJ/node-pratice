let http = require('http');

let req = http.request({
  method: 'POST',
  port: 3000,
  headers: {
    'Content-Type': 'application/json'
  }
});

req.write('[');
let n = 300000;
while (n--) {
  req.write('"foo", ');
}

req.write('"bar"]');
// console.log(req);
req.end();
