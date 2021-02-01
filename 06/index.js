let connect = require('connect');
let app = connect();
let url = require('url');
// let router = require('./middleware/router');
// let routes = {
//   GET: {
//     '/users': function(req, res) {
//       res.end('tobi, loki, ferret');
//     },
//     '/users/:id': function(req, res, id) {
//       res.end('user ' + id);
//     }
//   },
//   DELETE: {
//     'users/:id': function(req, res, id) {
//       res.end('deleted user ' + id)
//     }
//   }
// }

// app
//   .use(router(routes))
//   .use(logger(':method :url'))
//   .use(hello);

// app
//   .use(rewrite)
//   .use(showPost)
//   .listen(3000);

// app
//   .use(function hello(req, res) {
//     foo();
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('hello world');
//   })
//   .listen(3000);


// app
//   .use(router(require('./routes/user')))
//   .use(router(require('./routes/blog')))
//   .use(router(require('./routes/admin')))
//   .use(errorHandler());
//   /**
//  * 错误处理中间件
//  * 
// */
// function errorHandler() {
//   let env = process.env.NODE_ENV || 'development';
//   return function(err, req, res, next) {
//     res.statusCode = 500;
//     switch(env) {
//       case 'development':
//         res.setHeader('Content-Type', 'application/json');
//         res.end(JSON.stringify(err));
//         break;
//       default:
//         res.end('Server error');
//     }
//   }
// }

// app
//   .use(rewrite)
//   .use(showPost)
//   .listen(3000);

// 基于缩略名重写请求URL的中间件

// let path = url.parse(req.url).pathname;
// function rewrite(req, res, next) {
//   let match = path.match(/^\/blog\/posts\/(.+)/)
//   if (match) {
//     findPostIdBySlug(match[1], function(err, id) {
//       if (err) return next(err);
//       if (!id) return next(new Error('User not found'));
//       req.url = '/blog/posts/' + id;
//       next();
//     });
//   } else {
//     next();
//   }
// }

let api = app
            .use(users)
            .use(pets)
            .use(errorHandler);

let newApp = app
              .use(hello)
              .use('/api', api)
              .use(errorPage)
              .listen(3000);

