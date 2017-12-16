var _ = require('lodash');
var router = require('express').Router();
var Promise = require('bluebird');
var errorHandler = require('../common/errorHandler');
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
  console.log('/api/user');
  User.findOne({ userName })
    .populate('words.word')
    .then(user => res.json(user))
    .catch(err => errorHandler(err, res));
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

  Promise.all([
    User.findOne({ userName }),
    Word.find({})
  ]).spread((user, words) => {
    // TODO Don't get same word again
    const wordIndex = _.random(0, words.length-1);
    res.json(words[wordIndex]);
  }).catch(err => errorHandler(err, res));
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
  console.log('/api/user/word');
  const {
    wordId,
    correct
  } = req.body;

  User.findOne({ userName })
    .then(user => {
      user.words.push({
        word: wordId,
        correct
      });

      user.save()
        .then(user => res.send('OK'))
        .catch(err => errorHandler(err, res));
    })
    .catch(err => errorHandler(err, res));
});

// Wipes word answering history
router.post('/api/user/resetWords', function(req, res) {
  User.findOne({ userName })
    .then(user => {
      user.words = [];
      user.save()
        .then(user => res.send('OK'))
        .catch(err => errorHandler(err, res));
    })
    .catch(err => errorHandler(err, res));
});

module.exports = router;
