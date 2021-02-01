let http = require('http');
let items = [];
let qs = require('querystring');
let formidable = require('formidable');
let fs = require('fs');
let path = require('path');


// 样式展示
function show(res) {
  let html = '<html><head><title>Todo List</title></head><body>'
           + '<h1>Todo List</h1>'
           + '<ul>'
           + items.map(function (item) {
             return '<li>' + item + '</li>';
           }).join('')
           + '</ul>'
           + '<form method="post" action="/" enctype="multipart/form-data">'
           + '<p><input type="text" name="name" /></p>'
           + '<p><input type="file" name="file" multiple="multiple" /></p>'
           + '<p><input type="submit" value="Upload" /></p>'
           + '</form></body></html>';
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Length', Buffer.byteLength(html));
  res.end(html);
}

//接收响应对象
function notFound(res) {
  res.statusCode = 404;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Bad Request');
}

// 上传
function upload(req, res) {
  if (!isFormData(req)) {
    res.statusCode = 400;
    res.end('Bad Request: expecting multipart/form-data');
    return;
  }
  let fileName = new Date().getTime().toString();
  let savePath = path.resolve('data', fileName);
  fs.mkdir(savePath, { recursive: true }, (err) => {
    if (err) throw err;
    let form = formidable({
      uploadDir: savePath,
      keepExtensions: true,
      multiples: true
    });
    form.on('progress', function(bytesReceived, bytesExpected) {
      let percent = `${Math.floor(bytesReceived / bytesExpected * 100)}%`;
      console.log(percent);
    });
    form.parse(req, function(err, fields, files) {
      console.log(err);
      console.log(fields);
      console.log(files);
      res.end('upload complete');
    });
  });
  
}

function isFormData(req) {
  let type = req.headers['content-type'] || '';
  return 0 == type.indexOf('multipart/form-data');
}

let server = http.createServer(function(req, res) {
  if ('/' == req.url) {
    switch (req.method) {
      case 'GET':
        show(res);
        break;
      case 'POST':
        upload(req, res);
        break;
      default: 
        badRequest(res);
    }
  } else {
    notFound(res);
  }
});

server.listen(8888);