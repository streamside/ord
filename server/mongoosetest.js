var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ord');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to DB');

    var wordSchema = mongoose.Schema({
        name: String,
        description: String,
        difficulty: Number,
        wordClass: String,
        inflection: String,
        examples: [String]
    });

    var Word = mongoose.model('Word', wordSchema);

    Word.update({name: 'bärsärkagång'}, {inflection: '~en'}, function (err, raw) {
        if (err) {
            return handleError(err);
        }

        console.log('The raw response from Mongo was ', raw);
    });

    // var word = new Word({
    //     name: 'panegyrik',
    //     description: 'entusiastisk och o­kritisk lov­prisning',
    //     difficulty: 95,
    //     wordClass: 'substantiv',
    //     inflection: '~en ~er',
    //     examples: ['hans biografi över vännen är o­tillförlitlig då den ofta ur­artar till rena panegyriken']
    // });

    // var word = new Word({
    //     name: 'bärsärkagång',
    //     description: 'våldsam framfart under raseriutbrott',
    //     difficulty: 80,
    //     wordClass: 'substantiv',
    //     inflection: '~en',
    //     examples: ['de drack sig fulla och gick bärsärkagång']
    // });

    // var word = new Word({
    //     name: 'impertinent',
    //     description: 'respekt­löst upp­riktig eller när­gången om person, handling e.d.',
    //     difficulty: 85,
    //     wordClass: 'substantiv',
    //     inflection: '~',
    //     examples: ['reporterns impertinenta frågor om bonus­program']
    // });

    // var word = new Word({
    //     name: 'verserad',
    //     description: 'mycket artig och världs­van',
    //     difficulty: 80,
    //     wordClass: 'adjektiv',
    //     inflection: '',
    //     examples: ['hans verserade och eleganta konversation']
    // });

    // var word = new Word({
    //     name: 'anomali',
    //     description: 'o­rimlig före­teelse eller o­rimligt förhållande',
    //     difficulty: 60,
    //     wordClass: 'substantiv',
    //     inflection: '~n ~er',
    //     examples: ['barn­arbete är en anomali i det moderna sam­hället']
    // });

    // var word = new Word({
    //     name: 'perplex',
    //     description: '(märkbart) förbluffad över ngn plötslig vändning e.d.',
    //     difficulty: 80,
    //     wordClass: 'adjektiv',
    //     inflection: '~t',
    //     examples: ['han blev helt perplex när främlingen till­talade honom med hans för­namn']
    // });

    // word.save(function(err, word) {
    //     if (err) {
    //         console.error(err);
    //         return;
    //     }
    //     console.log('Word saved to db', word);
    // })
});
