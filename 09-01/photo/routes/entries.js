
var Entry = require('../lib/entry');
exports.form = function(req, res) {
  res.render('post', {title: 'Post'});
}
exports.submit = function(req, res, next) {
  let title = req.body.title;
  let body = req.body.body;
  let data = {
    title,
    body
  };
  let entry = new Entry({ 
    "username": res.locals.user.name,
    "title": data.title,
    "body": data.body
  });
  entry.save(function(err) {
    if (err) return next(err);
    res.redirect('/');
  })
}

exports.list = function(req, res, next) {
  let page = req.page;
  Entry.getRange(page.from, page.to, function(err, entries) {
    if (err) return next(err);
    res.render('entries', {
      title: 'Entries',
      entries: entries
    });
  });
}