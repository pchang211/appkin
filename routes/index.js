var express = require('express');
var router = express.Router();

// GET homepage
router.get('/', function(req, res) {
	console.log('render index view');
	res.render('index', {pageTitle: 'home'});
});

module.exports = router;
