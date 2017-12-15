var path = require('path');
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var word = require('./routes/word');
var user = require('./routes/user');

// DB
mongoose.connect('mongodb://localhost/ord', { useMongoClient: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// Express
var app = express();

// Configurations
app.use(express.static(path.join(__dirname, 'public')));
// app.use(bodyParser.urlencoded({ extended: false })); Not used at the moment as JSON is passed
app.use(bodyParser.json());

// Routes
app.use(word);
app.use(user);

// Start server
app.listen(3001, () => console.log('Server started on port 3001...'));
