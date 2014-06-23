var express = require('express');
var mongo = require('mongoskin');
var router = express.Router();

// GET events
router.get('/', function(req, res) {
	var db = req.db;
	db.collection('events').find().toArray(function(err, items) {
		res.json(items);
	});
});

router.get('/:eventid', function(req, res) {
	var db = req.db;
	db.collection('events').findById(req.params.eventid, function(err, result) {
		res.json(result);
	});
});

// POST events
router.post('/addevent', function(req, res) {
	var db = req.db;
	console.log(req.body);
	db.collection('events').insert(req.body, function(err, result) {
		res.send(
			(err === null) ? {msg: ''} : {msg: err}
		);
	});
});

router.delete('/delete/:event', function(req, res) {
	var db = req.db;
	console.log(req.params.event);
	db.collection('events').remove({'name': req.params.event}, function(err, result) {
		console.log('done');
	});
});

module.exports = router;