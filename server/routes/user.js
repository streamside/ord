var _ = require('lodash');
var router = require('express').Router();
var User = require('../models/user');
var Word = require('../models/word');

// TODO Read from session / cookie / request
const userName = 'streamside';

/*
 * User
 */

// Get information for user landing page
/*
Returns:
{
    user: {
        userName,
        email,
        access
        words: [{...}], // Words answered
    },
}
*/
router.get('/api/user', function(req, res) {
  return User.findOne({ userName })
    .populate('words.word')
    .exec(function(err, user) {
      if (err) {
        console.error(err);
        return;
      }
      res.json(user)
  });
});

// Get word to answer
/*
Returns:
{
    id,
    name,
    description,
    difficulty,
    ...
}
*/
router.get('/api/user/word', function(req, res) {

  // Find words the user has answered
  return User.findOne({ userName }).exec(function(err, user) {
    if (err) {
      console.error(err);
      return;
    }

    // Lookup words
    return Word.find({}).exec(function(err, words) {
      if (err) {
        console.error(err);
        return;
      }

      const wordIndex = _.random(0, words.length-1);
      res.json(words[wordIndex]);
    });
  });
});

// Answer if user knows the word
/*
Input:
{
    id, // Id of word
    correct
}
*/
router.post('/api/user/word', function(req, res) {
  console.log(req.body);
  const wordId = req.body.wordId;
  const correct = req.body.correct;

  return User.findOne({ userName }).exec(function(err, user) {
    if (err) {
      console.error(err);
      return;
    }

    user.words.push({
      word: wordId,
      correct
    });
    console.log('user', user)
    user.save(function(err) {
      console.log('saved used', err);
    }).then(function(user) {
      console.log('after save', user)
      res.send('OK');
    });
  });
});

// Wipes word answering history
router.post('/api/user/resetWords', function(req, res) {
  User.findOne({ userName }).exec(function(err, user) {
    if (err) {
      console.error(err);
      return;
    }

    user.words = [];
    user.save(function(err) {
      console.log('User saved. Error: ', err);
    }).then(function(user) {
      console.log('after save', user)
      res.send('OK');
    });
  })
});

module.exports = router;
