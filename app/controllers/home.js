var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  config = require('../../config/config'),
  Schema = mongoose.Schema;

mongoose.connect(config.db);
var db = mongoose.connection;
var dotenv = require('dotenv').config().parsed;

module.exports = function(app) {
  app.use('/', router);
};

router.get(['/', '/:collection'], function(req, res, next) {

  if (req.params.collection) {
    db.model(req.params.collection).find({}, function(err, count) {
      res.render('collection', {
        title: req.params.collection,
        articles: count
      });
    })
  } else {
    res.render('index', {
      title: 'Welcome to the Express Project',
      articles: JSON.parse(dotenv.DB_ROUTES)
    });
  }

});

router.post('/:collection', function(req, res, next) {

  db.collection(req.params.collection).insert({
    text: req.body.text
  })

  db.model(req.params.collection).find({}, function(err, count) {
    res.render('collection', {
      title: req.params.collection,
      articles: count
    });
  })
});
