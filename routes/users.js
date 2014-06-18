var express = require('express');
var router = express.Router();

// GET users
router.get('/', function(req, res) {
	var db = req.db;
	db.collection('users').find().toArray(function(err, items){
		res.json(items);
	});
});

// POST users
router.post('/adduser', function(req, res) {
	var db = req.db;
	db.collection('users').insert(req.body, function(err, result) {
		res.send(
			(err === null) ? {msg: ''} : {msg: err}
		);
	});
});

// DELETE users
router.delete('/deleteuser/:user', function(req, res) {
	var db = req.db;
	db.collection('users').remove({'name': req.params.user}, function(err, result) {
		console.log('done');
	});
});

module.exports = router;
