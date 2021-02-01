var User = require('../lib/user');

exports.form = function(req, res) {
  res.render('register', {title: 'Register'});
}

exports.submit = function(req, res, next) {
  let name = req.body.name;
  let pass = req.body.pass;
  let data = {
    name: name,
    pass: pass
  }
  User.getByName(data.name, function(err, user) {
    if (err) return next(err);
    // redis will default it
    if (user.id) {
      res.error("Username already taken!");
      res.redirect('back');
    } else {
      user = new User({
        name: data.name,
        pass: data.pass
      });
      user.save(function(err) {
        if (err) return next(err);
        console.log('user.id', user.id);
        console.log('user', user);
        req.session.uid = user.id;
        res.redirect('/');
      });
    }
  })
}