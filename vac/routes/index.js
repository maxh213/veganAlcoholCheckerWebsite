var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  	res.render('index', { title: 'Vegan Alcohol Checker' });
});

router.get('/alcohol', function(req, res, next) {
	alcohols = [
		{"name":'beer', "isVegan":'yes', "country":'UK'},
	 	{"name":'wine', "isVegan":'yes', "country":'France'}
	 ];
  	res.render('layout', { alcohols: alcohols});
});

module.exports = router;
