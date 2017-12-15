var Word = require('../models/word');
var router = require('express').Router();

/*
 * Word
 */
// List all words
router.get('/api/words', (req, res) => {
    console.log('Calling /api/words');
    return Word.find().exec(function(err, words) {
        if (err) {
            console.error(err);
            return;
        }
        //console.log('/api/words', words);
        res.json(words);
    });
})

// Get word information
// app.get('/api/words/:id');

module.exports = router;
