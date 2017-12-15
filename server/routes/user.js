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
router.get('/api/user', function(req, res) {
  return User.findOne({ userName }).exec(function(err, user) {
    if (err) {
      console.error(err);
      return;
    }
    res.json(user)
  });
});

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

// Get word to answer
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

// Answer to the word
router.post('/api/user/word', function(req, res) {
  console.log(req.body);
  const wordId = req.body.wordId;
  const correct = req.body.correct == 'true';

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
    });;
  });
});
/*
Input:
{
    id, // Id of word
    correct
}
*/

module.exports = router;
