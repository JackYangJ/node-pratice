var express = require('express');
var res = express.response;

res.message = function(msg, type) {
  type = type || 'info';
  var sess = this.req.session;
  sess.messages = sess.messages || [];
  sess.messages.push({type: type, string: msg});
  this.req.session = sess;
}

res.error = function(msg) {
  return this.message(msg, 'error');
}

module.exports = function(req, res, next) {
  res.locals.messages = req.session && req.session.messages || [];
  res.locals.removeMessages = function() {
    req.session.messages = [];
  }
  next();
}