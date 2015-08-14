'use strict';

var express = require('express'),
    router = express.Router(),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

var port = process.env.PORT || 3000;

var uristring = process.env.MONGODB_URI || 'mongodb://localhost/senso';

mongoose.connect(uristring, function (err, res) {
  if (err) {
    console.log('Error connecting to db');
  } else {
    console.log('Succeeded in connection to db');
  }
});

var clanSchema = new mongoose.Schema({
  name: { type: String },
  members: { type: Array, 'default': [] }
});
var Clan = mongoose.model('clan', clanSchema);

app.use('/', express['static'](__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router.get('/', function (req, res) {
  res.render('/index.html');
});

router.post('/newClan', function (req, res) {
  var data = req.body.data;
  var aClan = new Clan({
    name: data.name || '',
    members: []
  });
  aClan.save(function (err, obj) {
    if (err) {
      console.log('Error on save');
    } else {
      console.log('Saved!', obj);
    }
  });
});

router.post('/updateClan', function (req, res) {
  var data = req.body;
  Clan.findOne({ name: data.name }, function (err, rObj) {
    rObj.members = data.members;
    rObj.save(function (err, result) {
      if (err) {
        console.log('failed to update');
      } else {
        console.log('saved successfully');
      }
    });
  });
});

router.get('/members', function (req, res) {
  Clan.find({ name: 'Age of Empires' }).exec(function (err, result) {
    res.json(result[0]);
  });
});

app.use('/', router);

var serve = app.listen(port, function () {
  console.log('server has started running at localhost:' + port);
});
