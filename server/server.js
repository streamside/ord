var path = require('path');
var mongoose = require('mongoose');
var Promise = require('bluebird');
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var word = require('./routes/word');
var user = require('./routes/user');


/*
 * DB
 */
mongoose.connect('mongodb://localhost/ord', { useMongoClient: true });
mongoose.Promise = Promise
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


/*
 * Express
 */
var app = express();

// Configurations
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(morgan('tiny'))

// Routes
app.use(word);
app.use(user);

// Start server
app.listen(3001, () => console.log('Server started on port 3001...'));
