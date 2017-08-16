

var express = require('express'),
  config = require('./config/config'),
  glob = require('glob'),
  mongoose = require('mongoose'),
  dotenv = require('dotenv').config(),
  Schema = mongoose.Schema;

mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});

var collections = JSON.parse(dotenv.parsed.DB_ROUTES);

for(collection in collections) {
  mongoose.model(collections[collection],
    new Schema({
      text: {
        type: String
      },
      _id: {
        type: 'ObjectId',
        index: true
      }
    })
    );
}

var app = express();

module.exports = require('./config/express')(app, config);

app.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
});
