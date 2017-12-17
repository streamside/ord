const Word = require('../models/word');
const router = require('express').Router();
const errorHandler = require('../common/errorHandler');

/*
 * Word
 */
// List all words
router.get('/api/words', (req, res) => {
    Word.find()
      .then(words => res.json(words))
      .catch(err => errorHandler(err, res));
});

// Get word information
// app.get('/api/words/:id');

module.exports = router;
