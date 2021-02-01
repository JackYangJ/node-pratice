// var net = require('net');

// var server = net.createServer(function(socket) {
//   socket.on('data', function(data) {
//     console.log(data);
//     socket.write(data);
//   });
// });

// server.listen(8888);

// var EventEmitter = require('events').EventEmitter;
// var channel = new EventEmitter();
// channel.on('join', function() {
//   console.log('welcome');
// });
// channel.emit('join');

// // 简单的消息处理
// const MyEmitter = require('events');

// const channel = new MyEmitter.EventEmitter();
// var net = require('net');

// channel.clients = {};
// channel.subscriptions = {};

// channel.on('join', function(id, client) {
//   console.log(this.listeners('broadcast').length);
//   var welcome = 'Welcome!\n' +
//                 'Guest online：' + this.listeners('broadcast').length;
//   client.write(welcome + "\n");
//   console.log('id', id);
//   this.clients[id] = client;
//   this.subscriptions[id] = function(senderId, message) {
//     console.log(message);
//     if (id != senderId) {
//       this.clients[id].write(message);
//     }
//   }
//   this.on('broadcast', this.subscriptions[id]);
// });

// channel.setMaxListeners(50);

// var server = net.createServer();
// server.on('connection', function(client) {
//   console.log('新的用户加入了');
//   var id = client.remoteAddress + ':' + client.remotePort;
//   channel.emit('join', id, client);
//   client.on('data', function(data) {
//     data = data.toString();
//     console.log(data.toString());
//     if (data == 's') {
//       channel.emit('shutdown');
//     }
//     channel.emit('broadcast', id, data);
//   });
//   client.on('close', function() {
//     channel.emit('leave', id);
//   });
// });

// channel.on('leave', function(id) {
//   channel.removeListener('broadcast', this.subscriptions[id]);
//   channel.emit('broadcast', id, id + ' has left the chat.\n');
// });

// channel.on('shutdown', function() {
//   console.log('Start shut down');
//   channel.emit('broadcast', '', 'Chat has shut down. \n');
//   channel.removeAllListeners('broadcast');
// });

// server.listen(8888, '127.0.0.1');

// var events = require('events');
// var myEmitter = new events.EventEmitter();
// // myEmitter.on('error', function(err) {
// //   console.log('ERROR: ' + err.message);
// // }); 

// myEmitter.emit('', new Error('Something is wrong.'));


// 3-15
// function asyncFunction(callback) {
//   setTimeout(callback, 200);
// }
// var color = 'blue';
// (function(color) {
//   asyncFunction(function() {
//     console.log('The color is ' + color);
//   });
// })(color);
// 3-16
// var flow = require('nimble');
// flow.series([
//   function (callback) {
//     setTimeout(function() {
//       console.log('I execute first.');
//       callback();
//     }, 1000);
//   },
//   function (callback) {
//     setTimeout(function() {
//       console.log('I execute next.');
//       callback();
//     }, 500);
//   },
//   function (callback) {
//     setTimeout(function () {
//       console.log('I execute last.');
//       callback();
//     }, 100);
//   }
// ]);