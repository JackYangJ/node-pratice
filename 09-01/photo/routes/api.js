var basicAuth = require('express-basic-auth');
let User = require('../lib/user');

exports.auth = basicAuth(User.authenticate);

exports.user = function(req, res, next) {
  User.get(req.params.id, function(err, user) {
    if (err) return next(err);
    if (!user.id) return res.send(404);
    res.json(user);
  });
}