function parseField(field) {
  return field;
}

function getField(req, field) {
  let val = req.body;
  val = val[field];
  return val;
}

exports.required = function(field) {
  field = parseField(field);
  return function(req, res, next) {
    if (getField(req, field)) {
      next();
    } else {
      res.error(field.join(' ') + ' is required');
      res.redirect('back');
    }
  }
}

exports.lengthAbove = function(field,  len) {
  field = parseField(field);
  return function(req, res, next) {
    if (getField(req, field).length > len) {
      next();
    } else {
      res.error(field + ' must have more than ' + len + ' characters');
      res.redirect('back');
    }
  }
}