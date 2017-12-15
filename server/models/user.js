var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = Schema({
    userName: String,
    password: String,
    email: String,
    words: [{
        word: {
            type: Schema.Types.ObjectId,
            ref: 'Word'
        },
        correct: Boolean,
        when: {
            type: Date,
            default: Date.now
        },
        tries: {
            type: Number,
            default: 1,
            min: 1
        }
    }],
    access: [String]
});

var User = mongoose.model('User', userSchema);

module.exports = User;
