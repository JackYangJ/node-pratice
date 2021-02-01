// let redis = require('redis');
// let client = redis.createClient(6379, '127.0.0.1');

// client.on('error', err => {
//   console.log('Error', + err)
// });

// client.set('color', 'red', redis.print);
// client.get('color', (err, value) => {
//   if (err) throw err;
//   console.log('Got: ' + value);
// });

// 哈希表
// client.hmset('camping', {
//   'shelter': '2-person tent',
//   'cooking': 'campstove'
// });

// client.hget('camping', 'cooking', (err, value) => {
//   if (err) throw err;
//   console.log('Will be cooking with: ' + value);
// });

// client.hkeys('camping', (err, keys) => {
//   if (err) throw err;
//   keys.forEach((key, i) => {
//     console.log('  ' + key);
//   });
// });

// 简单聊天服务器
let net = require('net');
let redis = require('redis');
let server = net.createServer(socket => {
  let subscriber;
  let publisher;
  socket.on('connect', function() {
    subscriber = redis.createClient();
    subscriber.subscribe('main_chat_room');
    subscriber.on('message', (channel, message) => {
      socket.write('Channel ' + channel + ': ' + message);
    });
    publisher = redis.createClient();
  });
  socket.on('data', data => {
    publisher.publish('main_chat_room', data);
  });
  socket.on('end', () => {
    subscriber.unsubscriber('main_chat_room');
    subscriber.end();
    publisher.end();
  });
});

server.listen(3000);