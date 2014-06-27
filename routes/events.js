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

// GET specific event
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

// PUT events
// update with new attendee
router.put('/updateevent/:user', function(req, res) {
	var db = req.db;
	var event = req.body;
	console.log('log from put request');
	console.log(event);
	console.log('event id: ' + event._id);
	console.log(req.params.user);

	// for some reason I can't get it to work with identification by _id
	// want to use $push and $pull I think
	db.collection('events').update( 
		{name : event.name}, 
		{ '$push' : {users : req.params.user} },
		{ upsert:true },
		function(err, result) {
			res.send(
				(err === null) ? {msg: 'success'} : {msg: 'err'}
			);
		}
	);
});

// DELETE events
router.delete('/delete/:event', function(req, res) {
	var db = req.db;
	console.log(req.params.event);
	db.collection('events').remove({'name': req.params.event}, function(err, result) {
		console.log('done');
	});
});

module.exports = router;