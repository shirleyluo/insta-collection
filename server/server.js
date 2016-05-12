var path = require('path');
var express = require('express');

var morgan = require('morgan');
var parser = require('body-parser');

var app = express();

app.use(morgan('dev'));
app.use(parser.json());

var router = require('./routes');
var db = require('./database/interface');
app.use('/api', router);

var port = process.env.PORT || 4040;

// serve static files
app.use(express.static(path.resolve(__dirname, '..', 'app')));

db.init().then(function() {
  app.listen(port, function(err) {
    if (err) {
      console.error(err);
    } else {
      console.log('listening on port: ', port);
    }
  });
});

module.exports = app;
