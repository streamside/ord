var router = require('express').Router();
var readFile = require('fs-readfile-promise');
var Promise = require('bluebird');
var User = require('../models/user');
var Word = require('../models/word');

const createUsers = (users) => {
  return User.create(users)
    .then(data => data || [])
    .catch(err => console.error('Failed to save users', err));
};

const createWords = (words) => {
  return Word.create(words)
    .then(data => data || [])
    .catch(err => console.error('Failed to save words', err));
};

router.get('/api/data/importUsers', function(req, res) {
  console.log('About to import users');
  Promise.all([
      readFile('./data/users.json', 'utf8'),
      User.find()
    ])
    .spread((users, existingUsers) => {
      return {
        existingUserNames: existingUsers.map(user => user.userName),
        users: JSON.parse(users)
      };
    })
    .then(data => {
      const {
        users,
        existingUserNames
      } = data;
      return users.filter(user => !existingUserNames.includes(user.userName));
    })
    .then(createUsers)
    .then(usersCreated => {
      res.json({
        "count": usersCreated.length,
        usersCreated
      });
    });
});

router.get('/api/data/importWords', function(req, res) {
  console.log('About to import words');
  Promise.all([
      readFile('./data/words.json', 'utf8'),
      Word.find()
    ])
    .spread((words, existingWords) => {
      return {
        existingWordNames: existingWords.map(word => word.name),
        words: JSON.parse(words)
      };
    })
    .then(data => {
      const {
        words,
        existingWordNames
      } = data;
      return words.filter(word => !existingWordNames.includes(word.name));
    })
    .then(createWords)
    .then(wordsCreated => {
      res.json({
        "count": wordsCreated.length,
        wordsCreated
      });
    });
});

module.exports = router;
