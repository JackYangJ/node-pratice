let express = require('express');
let Photo = require('../models/Photo');
let path = require('path');
let join = path.join;
let fs = require('fs');
let router = express.Router();

/* GET home page. */

exports.list = router.get('/', function(req, res, next) {
  Photo.find({}, function(err, photos) {
    if (err) return next(err);
    res.render('photos', {
      title: 'Photos',
      photos: photos
    })
  })
});

exports.form = function(req, res) {
  res.render('photos/upload', {
    title: 'Photo upload'
  })
}

exports.upload = router.get('photo/upload', function(req, res) {
  res.render('upload', {
    title: 'Photo upload'
  });
})

exports.submit = function(dir) {
  return function(req, res, next) {
    let img = req.files.photoImg;
    let name = req.body.photoName ? `${req.body.photoName}.${img.name.split('.')[1]}` : img.name;
    let path = join(dir, name);
    // 处理跨区重命名文件出现的权限问题
    let readStream=fs.createReadStream(img.path);
    let writeStream=fs.createWriteStream(path);
    readStream.pipe(writeStream);
    readStream.on('end',function(err){
      fs.unlinkSync(img.path);
      if (err) return next(err);
      Photo.create({
        name: name,
        path: img.name
      }, function(err) {
        if (err) return next(err)
        res.redirect('/')
      })
    });
  }
}

exports.download = function(dir) {
  return function(req, res, next) {
    let id = req.params.id;
    Photo.findById(id, function(err, photo) {
      if (err) return next(err);
      let path = join(dir, photo.name);
      // res.sendfile(path);
      res.download(path, photo.name);
    })
  }
}