// let connect = require('connect');
// let cookieParser  = require('cookie-parser');
// let signature = require('cookie-signature');
// // console.log(signature.sign("eliza","eliza is smart"));
// let app = connect()
//   .use(cookieParser('eliza is smart'))
//   .use(function (req, res) {
//     console.log(req.cookies);
//     console.log(req.signedCookies);
//     res.end('hello\n');
//   }).listen(3000);

// let connect = require('connect');

// let app = connect()
//             .use(function(req, res) {
//               res.setHeader('Set-Cookie', 'foo=bar');
//               res.setHeader('Set-Cookie', 'tobi=ferret; Expires=Tue, 08 Jun 2021 10:18:14 GMT');
//               res.end();
//             }).listen(3000);

// let connect = require('connect');
// let bodyParser = require('body-parser');
// let app = connect()
// app
//   .use(bodyParser.json())
//   .use(function (req, res) {
//     // ...注册用户
//     res.end('Registerd new user: ' + req.body.username);
// }).listen(3000);


// let connect = require('connect');
// let urlencode = require('urlencode');
// let bodyParser = require('body-parser');
// let app = connect()
//             .use(connect.limit('32kb'))
//             .use(bodyParser.urlencoded({extended: false}))
//             .use(function(req, res) {
//               console.log(req.body);
//               res.end('thanks');
//             }).listen(3000);


// function type(type, fn) {
//   return function(req, res, next) {
//     let ct = req.headers['content-type'] || '';
//     if (0 != ct.indexOf(type)) {
//       return next();
//     }
//     fn(req, res, next);
//   }
// }

// let app = connect()
//             .use(type('application/x-www-form-urlencoded', connect.limit('64kb')))
//             .use(type('application/json', connect.limit('32kb')))
//             .use(type('image', connect.limit('2mb')))
//             .use(type('video', connect.limit('300mb')))
//             .use(connect.bodyParser())
//             .use(hello);

// let connect = require('connect');
// let connectQuery = require('connect-query');

// let  app = connect()
//             .use(connectQuery())
//             .use(function(req, res, next) {
//               res.setHeader('Content-Type', 'application/json');
//               res.end(JSON.stringify(req.query));
//             }).listen(3000);


// let connect = require('connect');
// let logger = require('morgan');
// let app = connect()
//             .use(logger('tiny'))
//             .use(function(req, res, next) {
//               res.end('hello\n');
//             })
//             .listen(3000);



// let connect = require('connect');
// let logger = require('morgan');
// let fs = require('fs');
// let path = require('path');
// let logPath = path.join(__dirname, 'log/my.log');
// let log = fs.createWriteStream(logPath, { flags: 'a'});
// let app = connect()
//             .use(logger(':method :url',
//               { 
//                 stream: log,
//                 immediate: true
//               }
//             ))
//             .use(function(req, res, next) {
//               res.end('hello\n');
//             })
//             .listen(3000);


// let  connect = require('connect');
// var favicons = require('connect-favicons');
// let logger = require('morgan');
// let path = require('path');
// let faviconsPath = path.join(__dirname, '/public/img/icons');

// let app = connect()
//             .use(favicons(faviconsPath))
//             .use(logger('short'))
//             .use(function(req, res) {
//               res.end('Hello World! \n');
//             }).listen(3000);

// let connect = require('connect');
// let methodOverride = require('method-override');

// let app = connect()
//             .use(methodOverride('__method__'))
//             .listen(3000);

// let connect = require('connect');
// let methodOverride = require('method-override');
// let logger = require('morgan');
// let bodyParser = require('body-parser');
// function edit(req, res, next) {
//   if ('GET' != req.method) return next();
//   res.setHeader('Content-Type', 'text/html');
//   res.write('<form method="post" enctype="application/x-www-form-urlencoded">');
//   res.write('<input type="hidden" name="_method" value="PUT" />');
//   res.write('<input type="text" name="user[name]" value="Tobi" />');
//   res.write('<input type="submit" value="Update" />');
//   res.write('</form>');
//   res.end();
// }

// function update(req, res, next) {
//   if ('PUT' != req.method) return next();
//   res.end('Updated name to ' + req.body.user.name);
// }

// let app = connect()
//             .use(logger('dev'))
//             .use(bodyParser.urlencoded())
//             .use(methodOverride(function (req, res) {
//               if (req.body && typeof req.body === 'object' && '_method' in req.body) {
//                 // look in urlencoded POST bodies and delete it
//                 var method = req.body._method
//                 delete req.body._method
//                 return method
//               }
//             }))
//             .use(edit)
//             .use(update)
//             .listen(3000);

// let connect = require('connect');
// let vhost = require('vhost')
// let server = connect();

// let app = require('./sites/expressjs.dev');

// server.use(vhost('baidu.com', function(req, res) {
//   console.log(req);
//   app.emit('request', req, res);
// }));
// server.listen(3000);

// 会话管理
// let connect = require('connect');
// let favicons = require('connect-favicons');
// let path = require('path');
// let faviconsPath = path.join(__dirname, '/public/img/icons');
// let cookieParser  = require('cookie-parser');
// let session = require('express-session')
// let hour = 3600000;
// let app = connect()
//   .use(favicons(faviconsPath))
//   .use(cookieParser('keyboard cat'))
//   .use(session({
//     key: 'myapp_asid',
//     cookie: {maxAge: 1000, secure: true}
//   }))
//   .use(function (req, res, next) {
//     let session = req.session;
//     res.setHeader('Content-Type', 'text/html')
//     res.write(`<p>views: ${session.cookie.maxAge / 1000}</p>`)
//     res.write(`<p>views: ${session.cookie.httpOnly}</p>`)
//     res.write(`<p>views: ${session.cookie.path}</p>`)
//     res.write(`<p>views: ${session.cookie.domain}</p>`)
//     res.write(`<p>views: ${session.cookie.secure}</p>`)
//     req.session.cookie.expires = new Date(Date.now() + 5000)
//     res.end()
//   })
//   app.listen(3000)

// web安全中间件

// let connect = require('connect');
// let app = conncet()
//           .use(connect.basicAuth('tj', 'tobi'));

// let users = {
//   tobi: 'foo',
//   loki: 'bar',
//   jane: 'baz'
// }
// let app = connect()
//           .use(connect.basicAuth(function (user, pass) {
//             return users[user] === pass;
//           }))
// let app = connect();
// app.use(connect.basicAuth(function(user, pass, callback) {
//   User.authenticate({user: user, pass: pass}, goUser);
//   function gotUser(err, user) {
//     if (err) return callback(err);
//     callback(null, user);
//   }
// }))

// let connect = require('connect');
// let auth = require('basic-auth')
// let app = connect()
// .use(function (req, res) {
//   let credentials = auth(req)
//   if (!credentials) {
//     console.log(111)
//   };
//   res.end("I'am a search\n")
// })
// app.listen(3000)

// let connect = require('connect');
// let logger = require('morgan');
// let errorHandler = require('errorhandler')

// let app = connect()
//           .use(logger('dev'))
//           .use(function(req, res, next) {
//             setTimeout(function() {
//               next(new Error('something broke!'))
//             }, 500)
//           })
//           .use(errorHandler());
// app.listen(3000)

// let connect = require('connect');
// let path = require('path');
// let static = require('serve-static');
// let app = connect()
//           .use(static(path.join(__dirname, 'public')))
//           // .use(function(req, res) {
//           //   res.end("I'am a search\n")
//           // })

// app.listen(3000)

//貌似压缩无效，甚至去除后，更小了
// let connect = require('connect');
// let path = require('path');
// let static = require('serve-static');
// let compression = require('compression')
// let app = connect()
//           // .use(compression({filter: filter}))
//           .use(static(path.join(__dirname, 'public')))
//           .use(function(req, res) {
//             res.end("I'am a search\n")
//           })
// function filter(req, res) {
//   return false
// }
// app.listen(3000)

let connect = require('connect');
let path = require('path');
let static = require('serve-static');
let compression = require('compression')
let app = connect()
          .use(connect.directory('public'))
          .use(static(path.join(__dirname, 'public')))
app.listen(3000)

