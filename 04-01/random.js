const fs = require('fs');
const request = require('request');
const htmlparser = require('htmlparser');
const configFileName = './rss_feeds.txt';

let checkForRSSFile = function () {
  fs.exists(configFileName, (exists) => {
    if (!exists) {
      return next(new Error('Miss RSS file: ' + configFileName));
    }
    next(null, configFileName);
  });
}

let readRSSFile = (configFileName) => {
  fs.readFile(configFileName, (err, feedList) => {
    if (err) return next(err);
    feedList = feedList
                .toString()
                .replace(/^\s+|s+$/g, '')
                .split('\n');
    let random = Math.floor(Math.random()*feedList.length);
    next(null, feedList[random]);
  });
}

let downloadRSSFeed = (feedUrl) => {
  console.log(feedUrl);
  request({uri: feedUrl}, (err, res, body) => {
    console.log(err);
    console.log(res);
    console.log(body);
    if (err) return next(err);
    if (res.statusCode != 200) {
      return next(new Error('Abnormal response status code'));
    }
    next(null, body);
  });
}

let parseRSSFeed = (res) => {
  let handler = new htmlparser.RssHandler();
  let parser = new htmlparser.Parser(handler);
  parser.parseComplete(rss);
  if (!handler.dom.items.length) {
    return next(new Error('No RSS items found'));
  }
  let item = handler.dom.items.shift();
  console.log(item.title);
  console.log(item.link);
}

let tasks = [ checkForRSSFile,
              readRSSFile,
              downloadRSSFeed,
              parseRSSFeed ];
function next(err, result) {
  if (err) throw err;
  let currentTask = tasks.shift();
  if (currentTask) {
    currentTask(result);
  }
}
next();