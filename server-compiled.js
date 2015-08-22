'use strict';

var express = require('express'),
    router = express.Router(),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    _ = require('lodash');

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
  members: { type: Array, 'default': [] },
  warMembers: { type: Array, 'default': [] },
  inWar: { type: Boolean, 'default': false }
});
var Clan = mongoose.model('clan', clanSchema);

app.use('/', express['static'](__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router.get('/', function (req, res) {
  res.render('/index.html');
});

// Create a new clan
router.post('/newClan', function (req, res) {
  var data = req.body;
  var aClan = new Clan({
    name: data.name || '',
    members: [],
    warMembers: [],
    inWar: false
  });
  aClan.save(function (err, obj) {
    if (err) {
      console.log('Error on save');
    } else {
      console.log('Saved!', obj);
    }
  });
});

// Update clan member settings
router.post('/updateClanMembers', function (req, res) {
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

// Update war members
router.post('/updateWarMembers', function (req, res) {
  var data = req.body;
  console.log('war members on server', data);
  Clan.findOne({ name: data.name }, function (err, rObj) {
    rObj.warMembers = data.warMembers;
    console.log('obj after saving would be', rObj);
    rObj.save(function (err, result) {
      if (err) {
        console.log('failed to update war members');
      } else {
        console.log('saved war members');
      }
    });
  });
});

// Get full clan data
router.get('/clanData', function (req, res) {
  Clan.find({ name: 'Age of Empires' }).exec(function (err, result) {
    res.json(result[0]);
  });
});

// Get members who are ready for war
router.get('/warReadyMembers', function (req, res) {
  Clan.findOne({ name: 'Age of Empires' }).exec(function (err, result) {
    var warReadyMembers = _.filter(result.members, function (member) {
      return member.war === true;
    });
    res.json(warReadyMembers);
  });
});

// Get members who are selected for the war
router.get('/warMembers', function (req, res) {
  Clan.findOne({ name: 'Age of Empires' }).exec(function (err, result) {
    res.json(result.warMembers);
  });
});

app.use('/', router);

var serve = app.listen(port, function () {
  console.log('server has started running at localhost:' + port);
});
