var router = require('express').Router();
var db = require('./database/interface');
var router = require('express').Router();

// TODO: send statuses
var users = {

  signUp: function(req, res) {
    // TODO: add password/auth
    db.User.findOrCreate({
      where: {
        username: req.body.username
      }
    })
      .then(function(user) {
        res.status(200).json(user);
      })
      .catch(function(err) {
        console.log('Error occurred at signup: ', err);
      });
  },
};

var collections = {
  
  getCollections: function(req, res) {
    var user = req.params.user;

    db.User.findOne({
      where: {
        username: user
      }
    })
      .then(function(user) {
        return user.getCollections();
      })
      .then(function(collections) {
        res.json(collections);
      })
      .catch(function(err) {
        console.log('Error occurred at getCollections: ', err);
      });
  },

  addCollection: function(req, res) {
    var user = req.body.user;
    var hashtag = req.body.hashtag;
    var dateStart = req.body.dateStart;
    var dateEnd = req.body.dateEnd;

    db.User.findOne({
      where: {
        username: user
      }
    })
      .then(function(user) {
        db.Collection.create({
          hashtag: hashtag,
          dateStart: dateStart,
          dateEnd: dateEnd,
          userId: user.id,
        })
          .then(function(collections) {
            res.json(collections);
          })
          .catch(function(err) {
            console.log('Error occurred at addCollection: ', err);
          });
      });
  }
};

var instagrams = {
  getEntries: function(req, res) {
    var user = req.params.user;
    var collectionid = req.params.collection;

    db.User.findOne({
      where: {
        username: user
      }
    })
      .then(function(user) {
        db.Instagram.findAll({
          where: {
            collectionId: collectionid,
            userId: user.id
          }
        })
          .then(function(instagrams) {
            res.json(instagrams);
          });
      })
      .catch(function(err) {
        console.log('Error occurred at getEntries: ', err);
      });

  },

  addEntry: function(req, res) {
    var collectionid = req.params.collection;
    var hashtag = req.body.hashtag;
    var username = req.body.username;
    var date = req.body.date;
    var contentURL = req.body.contentURL;
    var permalink = req.body.permalink;
    var user = req.body.user;

    db.User.findOne({
      where: {
        username: user
      }
    })
      .then(function(user) {
        db.Collection.findOne({
          where: {
            id: collectionid
          }
        })
          .then(function(collection) {
            db.Instagram.create({
              userId: user.id,
              collectionId: collection.id,
              hashtag: hashtag,
              date: date,
              user: username,
              contentURL: contentURL,
              permalink: permalink
            });
          })
          .then(function(instagram) {
            res.json(instagram);
          })
          .catch(function(err) {
            console.log('Error occurred at addEntry: ', err);
          });
      });

  }

};

// router.get('/collections/:user/:collection', instagrams.getEntries);
router.post('/collections/:collection', instagrams.addEntry);
router.get('/collections/:user', collections.getCollections);
router.post('/collections', collections.addCollection);
router.post('/users', users.signUp);

module.exports = router;
