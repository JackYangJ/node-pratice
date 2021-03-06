function Watcher(watchDir, processDir) {
  this.watchDir  = watchDir;
  this.processDir = processDir;
}

const events = require('events');
const util = require('util');

util.inherits(Watcher, events.EventEmitter);

Watcher.prototype = new events.EventEmitter();

const fs = require('fs')
, watchDir = './watch'
, processDir = './done';

Watcher.prototype.watch = function () {
  const watcher = this;
  fs.readdir(watcher.watchDir, function(err, files) {
    if (err) throw err;
    for (let index in files) {
      watcher.emit('process', files[index]);
    }
  });
};

Watcher.prototype.start = function () {
  var watcher = this;
  fs.watchFile(watchDir, function() {
    watcher.watch();
  });
}
var watcher = new Watcher(watchDir, processDir);

watcher.on('process', function process(file) {
  var watchFile = this.watchDir + '/' + file;
  var processedFile = this.processDir + '/' + file.toLowerCase();
  fs.rename(watchFile, processedFile, function(err) {
    if (err) throw err;
  });
});

watcher.start();