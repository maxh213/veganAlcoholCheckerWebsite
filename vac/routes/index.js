var express = require('express');
var router = express.Router();
var pg = require('pg');
require("./secretConstants");

/* GET home page. */
router.get('/', function(req, res, next) {
  	res.render('index', { title: 'Vegan Alcohol Checker' });
});

router.get('/a', function(req, res, next) {
	//a = alcohol
	//n = name, game it a short name because of twitter 140 character limit
	searchTerm = ["%" + req.query.n + "%"];
	selectProductQueryString = 
		"SELECT barnivore_product_name, barnivore_status, barnivore_country " + 
        "FROM barnivore_product " +
        "WHERE lower(barnivore_product_name) like lower($1)";
    runQuery(selectProductQueryString, searchTerm, res);
});

module.exports = router;

function runQuery(queryString, queryValues, res) {
    pg.connect(DB_CONNECT_STRING, function(err, client, done) {
        if(err) {
            return console.error('error fetching client from pool', err);
        }
		client.query(queryString, queryValues, function(err, result) {
			//call `done()` to release the client back to the pool
			done();

			if(err) {
				return console.error('error running query', err);
			} else {
				//console.log(result.rows)
				alcohols = [];
				for (var i = 0; i < result.rows.length; i++) {
					alcohols.push(
						{
							"name": result.rows[i].barnivore_product_name, 
							"isVegan": result.rows[i].barnivore_status, 
							"country": result.rows[i].barnivore_country
						}
					);
				}
			  	res.render('layout', { alcohols: alcohols});
			}
			
		});
	});
}