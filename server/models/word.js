var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var wordSchema = Schema({
    name: String,
    description: String,
    difficulty: Number,
    wordClass: String,
    inflection: String,
    examples: [String]
});

var Word = mongoose.model('Word', wordSchema);

module.exports = Word;
