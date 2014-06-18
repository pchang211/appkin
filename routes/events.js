var express = require('express');
var router = express.Router();

// GET events
router.get('/', function(req, res) {
	var db = req.db;
	db.collection('events').find().toArray(function(err, items) {
		res.json(items);
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

module.exports = router;