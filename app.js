var express = require('express');
var path = require('path');
var mongo = require('mongoskin');
var bodyParser = require('body-parser');
var logger = require('morgan');
//var db = mongo.db("mongodb://localhost:27017/appkin", {native_parser:true});

var mongoURI = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/appkin';
var db = mongo.db(mongoURI, function (err, db) {
	if (process.env.MONGOLAB_URI) {
		db.collection('appkin', function(er, collection) {
			collection.insert({'name': 'testname', 'email': 'testemail'}, {safe: true}, function(er, rs) {
			});
		});
	}
});

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
	req.db = db;
	next();
});

app.use('/', routes);
app.use('/users', users);

var server = app.listen(process.env.PORT || 8080, function() {
	console.log('Listening on port %d', server.address().port);
});

