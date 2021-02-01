var User = require('../lib/user');

exports.form = function(req, res) {
  res.render('login', {title: 'login'});
}

exports.submit = function(req, res, next) {
  let name = req.body.name;
  let pass = req.body.pass;
  let data = {
    name: name,
    pass: pass
  }
  User.authenticate(data.name, data.pass, function(err, user) {
    if (err) return next(err);
    if (user) {
      req.session.uid = user.id;
      res.redirect('/1');
    } else {
      res.error("Sorry! invalid credentials.");
      res.redirect('back');
    }
  });
}

exports.logout = function(req, res) {
  req.session.destroy(function(err) {
    res.redirect('/');
  });
}